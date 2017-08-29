const initialState = {
  selected: ''
};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case 'SELECT_MENU_ITEM': {
      return {
        ...state,
        selected: action.selected
      };
    }
    default: {
      return state;
    }
  }
}

export default menuReducer;
