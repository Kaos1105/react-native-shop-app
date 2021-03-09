import React, { useEffect, useReducer } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface IProps extends TextInputProps {
  label: string;
  id: string;
  errorText: string;
  initialValue?: string;
  initialValidity?: boolean;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  onInputChange(id: string, value: string, isValid: boolean): void;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUE';

interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
}

interface InputAction {
  type: typeof INPUT_CHANGE | typeof INPUT_BLUR;
  value?: string;
  isValid?: boolean;
}

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return { ...state, value: action.value, isValid: action.isValid };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props: IProps) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialValidity,
    touched: false,
  });

  useEffect(() => {
    if (inputState.touched) props.onInputChange(props.id, inputState.value, inputState.isValid);
  }, [inputState, props.onInputChange, props.id]);

  const textChangeHandler = (text: string) => {
    const emailRegex = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]){2,4}$/;
    let isValid = true;
    if (
      (props.required && text.trim().length === 0) ||
      (props.email && !emailRegex.test(text.toLowerCase())) ||
      (props.min != null && +text < props.min) ||
      (props.max != null && +text > props.min) ||
      (props.minLength != null && text.length < props.minLength)
    ) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        value={inputState.value}
        // keyboardType='default'
        // autoCapitalize='sentences'
        // returnKeyType='next'
      />
      {!inputState.isValid && <Text>{props.errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  label: { fontFamily: 'open-sans-bold', marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formControl: { width: '100%' },
});

export default Input;
