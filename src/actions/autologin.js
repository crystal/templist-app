import firebase from 'firebase';

function autologin() {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_REQ'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'LOGIN_RES',
          email: user.email,
          uid: user.uid
        });
      }
    });
  };
}

export default autologin;
