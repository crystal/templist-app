const initialState = {
  currentModal: ''
};

function modalReducer(state = initialState, action) {
  switch (action.type) {
    case 'HIDE_MODAL': {
      return {
        ...state,
        currentModal: ''
      };
    }
    case 'SHOW_MODAL': {
      return {
        ...state,
        currentModal: action.currentModal
      };
    }
    // hide modal on successful responses
    case 'COPY_RES': {
      return {
        ...state,
        currentModal: ''
      };
    }
    case 'DELETE_TEMPLATE_RES': {
      return {
        ...state,
        currentModal: ''
      };
    }
    case 'EXPORT_TEMPLATE_RES': {
      return {
        ...state,
        currentModal: ''
      };
    }
    case 'LOGIN_RES': {
      return {
        ...state,
        currentModal: ''
      };
    }
    case 'SIGNUP_RES': {
      return {
        ...state,
        currentModal: ''
      };
    }
    default: {
      return state;
    }
  }
}

export default modalReducer;
