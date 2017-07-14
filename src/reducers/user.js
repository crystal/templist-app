const initialState = {
  email: '',
  error: '',
  isLoading: false,
  isLoggedIn: false
};

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQ': {
      return {
        ...state,
        email: '',
        error: '',
        isLoading: true,
        isLoggedIn: false
      };
    }
    case 'LOGIN_RES': {
      return {
        ...state,
        email: action.email,
        error: '',
        isLoading: false,
        isLoggedIn: true
      };
    }
    case 'LOGIN_ERR': {
      return {
        ...state,
        email: '',
        error: action.error,
        isLoading: false,
        isLoggedIn: false
      };
    }
    default: {
      return state;
    }
  }
}

export default modalReducer;
