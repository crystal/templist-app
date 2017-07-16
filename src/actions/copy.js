import firebase from 'firebase';

function copy(template) {
  return (dispatch) => {
    dispatch({
      type: 'COPY_REQ'
    });
    firebase.database()
      .ref('/templates')
      .push(template)
      .then(() => {
        dispatch({
          type: 'COPY_RES'
        });
      })
      .catch((error) => {
        dispatch({
          type: 'COPY_ERR',
          error: error.message
        });
      });
  };
}

export default copy;
