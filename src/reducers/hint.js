const initialState = {
  currentHint: '',
  target: ''
};

function hintReducer(state = initialState, action) {
  switch (action.type) {
    case 'HIDE_HINT': {
      return {
        ...state,
        currentHint: '',
        target: ''
      };
    }
    case 'SHOW_HINT': {
      return {
        ...state,
        currentHint: action.currentHint,
        target: action.target
      };
    }
    default: {
      return state;
    }
  }
}

export default hintReducer;
