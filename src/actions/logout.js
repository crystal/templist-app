import firebase from 'firebase';

function logout() {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT_REQ'
    });
    firebase.auth()
      .signOut()
      .then(() => {
        dispatch({
          type: 'LOGOUT_RES'
        });
      })
      .catch((error) => {
        dispatch({
          type: 'LOGOUT_ERR',
          error: error.message
        });
      });
  };
}

export default logout;
