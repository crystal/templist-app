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
    default: {
      return state;
    }
  }
}

export default modalReducer;
