import { AppThunk } from '../../App';

export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
interface SignUpAction {
  type: typeof SIGN_UP;
  token: string;
  userId: string;
}

interface LogInAction {
  type: typeof LOG_IN;
  token: string;
  userId: string;
}

export type AuthActionType = LogInAction | SignUpAction;

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
      dispatch({ type: SIGN_UP, token: resData.idToken, userId: resData.localId });
    } catch (err) {
      throw err;
    }
  };
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
      dispatch({ type: LOG_IN, token: resData.idToken, userId: resData.localId });
    } catch (err) {
      throw err;
    }
  };
};
