import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import React, { useCallback } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  View,
  TextInput,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Color from '../../constants/Color';
import * as yup from 'yup';
import * as authActions from '../../store/actions/auth';

const AuthScreen = (props) => {
  const dispatch = useDispatch();

  const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Please enter valid email').required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      dispatch(authActions.signUp(values.email, values.password));
    },
  });

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient colors={['#ffedff', '#ffa1f9']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <View style={styles.formControl}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                onChangeText={formik.handleChange('email')}
                // onChange={formik.handleChange}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                keyboardType='default'
                autoCapitalize='none'
              />
              {formik.errors.email && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{formik.errors.email}</Text>
                </View>
              )}
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                onChangeText={formik.handleChange('password')}
                // onChange={formik.handleChange}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
                keyboardType='default'
                secureTextEntry
                autoCapitalize='none'
              />
            </View>
            {formik.errors.password && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{formik.errors.password}</Text>
              </View>
            )}
            <Button
              title='Login'
              color={Color.primary}
              onPress={() => {
                formik.handleSubmit();
              }}
            />
            <View style={styles.buttonContainer} />
            <Button title='Switch to Sign Up' color={Color.accent} onPress={() => {}} />
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  authContainer: {
    padding: 20,
    marginHorizontal: 40,
  },
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
  formControl: { width: '100%' },
  label: { fontFamily: 'open-sans-bold', marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});

export default AuthScreen;
