export const initialState = {
  peran: '',
  load: false,
  isSignout: true,
  // api: 'http://127.0.0.1:8000/api/v1',
  api: 'https://backend-iguana.herokuapp.com/api/v1',
};

export const actionTypes = {
  UPDATE_LOADING: 'UPDATE_LOADING',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isSignout: false,
        peran: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
      };
    case 'UPDATE_LOADING':
      return { ...state, load: !state.load };
      break;
    default:
      return state;
  }
};
