import React, { useReducer } from 'react';
import { View, ScrollView, StyleSheet, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App';
import { useCallback } from 'react';
import { useEffect } from 'react';
import * as productActions from '../../store/actions/products';
import Input from '../../components/UI/Input';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

interface FormStateAction {
  type: typeof FORM_INPUT_UPDATE;
  value: string;
  isValid: boolean;
  input: string;
}

interface FormState {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  formIsValid: boolean;
}

const formReducer = (state: FormState, action: FormStateAction) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities: any = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const EditProductScreen = (props: IProps) => {
  const prodId = props.navigation.getParam('productId');
  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{ text: 'Okay' }]);
      return;
    }
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        productActions.createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' keyboardVerticalOffset={20}>
      <ScrollView>
        <View style={styles.form}>
          {/* <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={inputChangeHandler.bind(this, 'title')}
            // onChange={formik.handleChange}
            //onBlur={formik.handleBlur('title')}
            value={formState.inputValues.title}
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
          />
        </View> */}
          <Input
            label='Title'
            id='title'
            errorText='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
            initialValue={editedProduct ? editedProduct.title : ''}
            initialValidity={!!editedProduct}
          />
          <Input
            label='Image Url'
            id='imageUrl'
            errorText='Please enter a valid image url!'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initialValidity={!!editedProduct}
            required
          />
          {!editedProduct && (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              min={0}
              onInputChange={inputChangeHandler}
            />
          )}

          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid Description'
            keyboardType='default'
            autoCapitalize='sentences'
            multiline
            numberOfLines={3}
            initialValue={editedProduct ? editedProduct.description : ''}
            initialValidity={!!editedProduct}
            required
            minLength={5}
            onInputChange={inputChangeHandler}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (navData: IProps) => {
  const submitFunction = navData.navigation.getParam('submit');

  return {
    headerTitle: navData.navigation.getParam('productId') ? 'EditProduct' : 'AddProduct',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Save'
          iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
          onPress={submitFunction}
        />
      </HeaderButtons>
    ),
  };
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

export default EditProductScreen;
