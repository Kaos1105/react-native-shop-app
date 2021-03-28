import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppThunk } from '../../App';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOG_OUT = 'LOG_OUT';

let timer;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  token: string;
  userId: string;
}

interface LogOutAction {
  type: typeof LOG_OUT;
}

export type AuthActionType = AuthenticateAction | LogOutAction;

export const authenticate = (userId: string, token: string, expirationTime: number) => {
  return (dispatch) => {
    dispatch(setLogOutTimer(expirationTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
  return;
};

export const signUp = (email: string, password: string): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCegCBvNU8Bm4CuaTcbGOLTiWLeV8c9wuk',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        const errMess = resData.error.message;
        let message = 'Sign up failed';
        if (errMess === 'EMAIL_EXISTS') {
          message = 'This email already exists!';
        } else if (errMess === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
          message = 'Too many attempt, try later';
        } else if (errMess === 'OPERATION_NOT_ALLOWED') {
          message = 'Operation failed';
        }
        throw new Error(message);
      }
      dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (err) {
      throw err;
    }
  };
};

export const logOut = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOG_OUT };
};

export const logIn = (email: string, password: string): AppThunk<void> => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCegCBvNU8Bm4CuaTcbGOLTiWLeV8c9wuk',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      );

      const resData = await response.json();
      if (!response.ok) {
        const errMess = resData.error.message;
        let message = 'Something went wrong';
        if (errMess === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errMess === 'INVALID_PASSWORD') {
          message = 'Password is invalid';
        } else if (errMess === 'USER_DISABLED') {
          message = 'User is disabled';
        }
        throw new Error(message);
      }
      dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    } catch (err) {
      throw err;
    }
  };
};

const saveDataToStorage = (token: string, userId: string, expireDate: Date) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expireDate.toISOString(),
    })
  );
};

const setLogOutTimer = (expirationTime: number) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  };
};
