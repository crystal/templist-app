import firebase from 'firebase';

function login(email, password) {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_REQ'
    });
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(function handleResponse(res) {
        dispatch({
          type: 'LOGIN_RES',
          email: res.email,
          uid: res.uid
        });
      })
      .catch(function handleError(error) {
        dispatch({
          type: 'LOGIN_ERR',
          error: error.message
        });
      });
  };
}

export default login;
