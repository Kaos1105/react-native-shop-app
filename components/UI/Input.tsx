import React, { useReducer } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface IProps extends TextInputProps {
  label: string;
  errorText: string;
  initialValue: string;
  initialValidity: boolean;
  required: boolean;
  email: boolean;
  min?: number;
  max?: number;
  minLength?: number;
}

const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
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
    dispatch({ type: INPUT_CHANGE, value: text });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        onChangeText={inputChangeHandler.bind(this, 'title')}
        value={formState.inputValues.title}
        // keyboardType='default'
        // autoCapitalize='sentences'
        // returnKeyType='next'
      />
      {!fromState.inputValidities.title && <Text>{props.errorText}</Text>}
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
