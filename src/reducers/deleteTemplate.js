const initialState = {
  error: '',
  isComplete: false,
  isLoading: false,
  key: '',
  title: ''
};

function deleteTemplateReducer(state = initialState, action) {
  switch (action.type) {
    case 'DELETE_TEMPLATE_REQ': {
      return {
        ...state,
        error: '',
        isComplete: false,
        isLoading: true
      };
    }
    case 'DELETE_TEMPLATE_RES': {
      return {
        ...state,
        error: '',
        isComplete: true,
        isLoading: false
      };
    }
    case 'DELETE_TEMPLATE_ERR': {
      return {
        ...state,
        error: action.error,
        isComplete: false,
        isLoading: false,
        key: '',
        title: ''
      };
    }
    case 'SHOW_MODAL': {
      return {
        ...state,
        key: action.data.key,
        title: action.data.title
      };
    }
    case 'RESET_TEMPLATE': {
      return {
        ...state,
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
}

export default deleteTemplateReducer;
