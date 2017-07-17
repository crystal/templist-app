const initialState = {
  email: '',
  error: '',
  favorites: [],
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
        favorites: [],
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
        favorites: action.favorites,
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
        favorites: [],
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
        favorites: [],
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
        favorites: [],
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
        favorites: [],
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
        favorites: [],
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
        favorites: [],
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
        favorites: [],
        isLoading: false,
        isLoggedIn: false,
        uid: ''
      };
    }
    case 'LIST_FAVORITES_RES': {
      return {
        ...state,
        favorites: action.favorites
      };
    }
    default: {
      return state;
    }
  }
}

export default userReducer;
