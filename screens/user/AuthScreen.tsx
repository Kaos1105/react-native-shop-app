import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  View,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Card from '../../components/UI/Card';
import Color from '../../constants/Color';
import * as yup from 'yup';
import * as authActions from '../../store/actions/auth';
import Loading from '../../components/UI/Loading';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const AuthScreen = (props: IProps) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred', error, [{ text: 'Okay' }]);
    }
  }, [error]);

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
    onSubmit: async (values) => {
      let action;
      isSignUp
        ? (action = authActions.signUp(values.email, values.password))
        : (action = authActions.logIn(values.email, values.password));
      setError(null);
      setIsLoading(true);
      try {
        await dispatch(action);
        props.navigation.navigate('Shop');
      } catch (err) {
        console.log(err);
        setError(err.message);
        setIsLoading(false);
      }
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
            {isLoading ? (
              <Loading />
            ) : (
              <Button
                title={isSignUp ? 'Sign Up' : 'Log In'}
                color={Color.primary}
                onPress={() => {
                  formik.handleSubmit();
                }}
              />
            )}
            <View style={styles.buttonContainer} />
            <Button
              title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
              color={Color.accent}
              onPress={() => {
                setIsSignUp(!isSignUp);
              }}
            />
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
