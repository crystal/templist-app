const initialState = {
  error: '',
  isLoading: false,
  originalDescription: '',
  originalItems: [],
  originalTitle: ''
};

function copyReducer(state = initialState, action) {
  switch (action.type) {
    case 'COPY_REQ': {
      return {
        ...state,
        error: '',
        isLoading: true
      };
    }
    case 'COPY_RES': {
      return {
        ...state,
        error: '',
        isLoading: false
      };
    }
    case 'COPY_ERR': {
      return {
        ...state,
        error: action.error,
        isLoading: false
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

export default copyReducer;
