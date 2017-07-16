import firebase from 'firebase';

function signup(email, password) {
  return (dispatch) => {
    dispatch({
      type: 'SIGNUP_REQ'
    });
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        dispatch({
          type: 'SIGNUP_RES',
          email: res.email,
          uid: res.uid
        });
      })
      .catch((error) => {
        dispatch({
          type: 'SIGNUP_ERR',
          error: error.message
        });
      });
  };
}

export default signup;
