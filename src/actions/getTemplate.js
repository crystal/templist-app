import firebase from 'firebase';

function getTemplate(key) {
  return (dispatch) => {
    dispatch({
      type: 'GET_TEMPLATE_REQ'
    });
    firebase.database()
      .ref(`/templates/${key}`)
      .once('value')
      .then((snapshot) => {
        const template = snapshot.val() || {};
        dispatch({
          type: 'GET_TEMPLATE_RES',
          author: template.author,
          description: template.description,
          items: template.items,
          key,
          title: template.title
        });
      })
      .catch((error) => {
        dispatch({
          type: 'GET_TEMPLATE_ERR',
          error: error.message
        });
      });
  };
}

export default getTemplate;
