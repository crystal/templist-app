import firebase from 'firebase';

function deleteTemplate(templateKey) {
  return (dispatch) => {
    dispatch({
      type: 'DELETE_TEMPLATE_REQ'
    });
    firebase.database()
      .ref(`/templates/${templateKey}`)
      .remove()
      .then(() => {
        dispatch({
          type: 'DELETE_TEMPLATE_RES'
        });
      })
      .catch((error) => {
        dispatch({
          type: 'DELETE_TEMPLATE_ERR',
          error: error.message
        });
      });
  };
}

export default deleteTemplate;
