import { AppThunk } from '../../App';

export const SIGN_UP = 'SIGN_UP';
interface SignUpAction {
  type: typeof SIGN_UP;
  email: string;
  password: string;
}

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

      if (!response.ok) {
        throw new Error('Sign up failed');
      }
      const resData = await response.json();
      console.log(resData);
      dispatch({ type: SIGN_UP });
    } catch (err) {}
  };
};
