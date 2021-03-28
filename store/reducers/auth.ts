import { AuthActionType, AUTHENTICATE, LOG_OUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOG_OUT:
      return initialState;
    // case SIGN_UP:
    //   return {
    //     ...state,
    //     token: action.token,
    //     userId: action.userId,
    //   };
    default:
      return state;
  }
};
