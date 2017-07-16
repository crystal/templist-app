const initialState = {
  error: '',
  isComplete: false,
  isLoading: false,
  originalDescription: '',
  originalItems: [],
  originalTitle: '',
  title: '',
  url: ''
};

function exportReducer(state = initialState, action) {
  switch (action.type) {
    case 'EXPORT_TEMPLATE_REQ': {
      return {
        ...state,
        error: '',
        isComplete: false,
        isLoading: true,
        title: '',
        url: ''
      };
    }
    case 'EXPORT_TEMPLATE_RES': {
      return {
        ...state,
        error: '',
        isComplete: true,
        isLoading: false,
        title: action.title,
        url: action.url
      };
    }
    case 'EXPORT_TEMPLATE_ERR': {
      return {
        ...state,
        error: action.error,
        isComplete: false,
        isLoading: false,
        title: '',
        url: ''
      };
    }
    case 'RESET_TEMPLATE': {
      return {
        ...state,
        ...initialState
      };
    }
    case 'SHOW_MODAL': {
      return {
        ...state,
        originalDescription: action.data.description,
        originalItems: action.data.items,
        originalTitle: action.data.title
      };
    }
    default: {
      return state;
    }
  }
}

export default exportReducer;
