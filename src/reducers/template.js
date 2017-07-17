const initialState = {
  author: '',
  description: '',
  error: '',
  isLoading: false,
  items: [],
  key: '',
  title: ''
};

function exportReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_TEMPLATE_REQ': {
      return {
        ...state,
        author: '',
        description: '',
        error: '',
        isLoading: true,
        items: [],
        key: '',
        title: ''
      };
    }
    case 'GET_TEMPLATE_RES': {
      return {
        ...state,
        author: action.author,
        description: action.description,
        error: '',
        isLoading: false,
        items: action.items,
        key: action.key,
        title: action.title
      };
    }
    case 'GET_TEMPLATE_ERR': {
      return {
        ...state,
        author: '',
        description: '',
        error: action.error,
        isLoading: false,
        items: [],
        key: '',
        title: ''
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

export default exportReducer;
