import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useFormik } from 'formik';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../App';
import { useCallback } from 'react';
import { useEffect } from 'react';
import * as productActions from '../../store/actions/products';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const EditProductScreen = (props: IProps) => {
  const prodId = props.navigation.getParam('productId');
  const editProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: editProduct
      ? {
          title: editProduct.title,
          imageURL: editProduct.imageUrl,
          description: editProduct.description,
          price: editProduct.price,
        }
      : { title: '', imageURL: '', description: '', price: 0 },
    onSubmit: (values) => {
      if (editProduct) {
        dispatch(
          productActions.updateProduct(prodId, values.title, values.description, values.imageURL)
        );
      } else {
        dispatch(
          productActions.createProduct(
            values.title,
            values.description,
            values.imageURL,
            +values.price
          )
        );
      }
      props.navigation.goBack();
    },
  });

  const submitHandler = useCallback(() => {
    formik.handleSubmit();
  }, []);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, []);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('title')}
            // onChange={formik.handleChange}
            onBlur={formik.handleBlur('title')}
            value={formik.values.title}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('imageURL')}
            onBlur={formik.handleBlur('imageURL')}
            value={formik.values.imageURL}
          />
        </View>
        {!editProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              onChangeText={formik.handleChange('price')}
              onBlur={formik.handleBlur('price')}
              value={formik.values.price.toString()}
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            value={formik.values.description}
          />
        </View>
      </View>
    </ScrollView>
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
