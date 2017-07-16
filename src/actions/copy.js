import firebase from 'firebase';

function copy(template) {
  return (dispatch) => {
    dispatch({
      type: 'COPY_REQ'
    });
    firebase.database()
      .ref('/templates')
      .push(template)
      .then((newTemplate) => {
        dispatch({
          type: 'COPY_RES',
          newKey: newTemplate.key
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
