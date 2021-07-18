export const initialState = {
  nama_konten: 'Dashboard Seminar',
  role_user: 'Mahasiswa',
  user: {},
  load: false,
  isLoading: false,
  isSignout: true,
  token: '',
  // api: 'http://127.0.0.1:8000/api/v1',
  api: 'https://backend-seminar.herokuapp.com/api/v1',
  number: 0,
};

export const actionTypes = {
  RESTORE_TOKEN: 'RESTORE_TOKEN',
  UPDATE_LOADING: 'UPDATE_LOADING',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RESTORE_TOKEN:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      console.log('here');
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    case 'LOGIN_ADD_USER':
      return { ...state, user: action.payload };
      break;
    case 'inc':
      return {
        ...state,
        number: state.number + 1,
      };
      break;

    case 'UPDATE_LOADING':
      return { ...state, load: !state.load };
      break;
    default:
      return state;
  }
};
