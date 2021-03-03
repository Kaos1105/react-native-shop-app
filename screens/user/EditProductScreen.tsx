import React from 'react';
import { View, ScrollView, Text, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Formik, useFormikContext } from 'formik';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../App';
import { useCallback } from 'react';
import { useEffect } from 'react';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const EditProductScreen = (props: IProps) => {
  const prodId = props.navigation.getParam('productId');
  const editProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  );
  const { handleSubmit } = useFormikContext();
  const submitHandler = useCallback(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <Formik
      initialValues={
        editProduct
          ? {
              title: editProduct.title,
              imageURL: editProduct.imageUrl,
              description: editProduct.description,
              price: editProduct.price,
            }
          : { title: '', imageURL: '', description: '', price: 0 }
      }
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <ScrollView>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.title}
              />
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Image URL</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('imageURL')}
                onBlur={handleBlur('imageURL')}
                value={values.imageURL}
              />
            </View>
            {!editProduct && (
              <View style={styles.formControl}>
                <Text style={styles.label}>Price</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                  value={values.price.toString()}
                />
              </View>
            )}

            <View style={styles.formControl}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
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
