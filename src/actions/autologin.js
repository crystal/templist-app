import firebase from 'firebase';

function autologin() {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_REQ'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database()
          .ref(`/users/${user.uid}`)
          .once('value')
          .then((snapshot) => {
            const profile = snapshot.val() || {};
            const favorites = profile.favorites || [];
            dispatch({
              type: 'LOGIN_RES',
              email: user.email,
              favorites,
              uid: user.uid
            });
          });
      }
    });
  };
}

export default autologin;
