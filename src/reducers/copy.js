const initialState = {
  error: '',
  isComplete: false,
  isLoading: false,
  originalDescription: '',
  originalItems: [],
  originalTitle: '',
  newKey: ''
};

function copyReducer(state = initialState, action) {
  switch (action.type) {
    case 'COPY_REQ': {
      return {
        ...state,
        error: '',
        isComplete: false,
        isLoading: true,
        newKey: ''
      };
    }
    case 'COPY_RES': {
      return {
        ...state,
        error: '',
        isComplete: true,
        isLoading: false,
        newKey: action.newKey
      };
    }
    case 'COPY_ERR': {
      return {
        ...state,
        error: action.error,
        isComplete: false,
        isLoading: false,
        newKey: ''
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

export default copyReducer;
