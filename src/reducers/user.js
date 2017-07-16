const initialState = {
  email: '',
  error: '',
  isLoading: false,
  isLoggedIn: false,
  uid: ''
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQ': {
      return {
        ...state,
        email: '',
        error: '',
        isLoading: true,
        isLoggedIn: false,
        uid: ''
      };
    }
    case 'LOGIN_RES': {
      return {
        ...state,
        email: action.email,
        error: '',
        isLoading: false,
        isLoggedIn: true,
        uid: action.uid
      };
    }
    case 'LOGIN_ERR': {
      return {
        ...state,
        email: '',
        error: action.error,
        isLoading: false,
        isLoggedIn: false,
        uid: ''
      };
    }
    case 'LOGOUT_REQ': {
      return {
        ...state,
        email: '',
        error: '',
        isLoading: true,
        isLoggedIn: false,
        uid: ''
      };
    }
    case 'LOGOUT_RES': {
      return {
        ...state,
        email: '',
        error: '',
        isLoading: false,
        isLoggedIn: false,
        uid: ''
      };
    }
    case 'LOGOUT_ERR': {
      return {
        ...state,
        email: '',
        error: action.error,
        isLoading: false,
        isLoggedIn: false,
        uid: ''
      };
    }
    case 'SIGNUP_REQ': {
      return {
        ...state,
        email: '',
        error: '',
        isLoading: true,
        isLoggedIn: false,
        uid: ''
      };
    }
    case 'SIGNUP_RES': {
      return {
        ...state,
        email: action.email,
        error: '',
        isLoading: false,
        isLoggedIn: true,
        uid: action.uid
      };
    }
    case 'SIGNUP_ERR': {
      return {
        ...state,
        email: '',
        error: action.error,
        isLoading: false,
        isLoggedIn: false,
        uid: ''
      };
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
