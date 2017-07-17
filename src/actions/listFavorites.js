import firebase from 'firebase';

function listFavorites(uid) {
  return (dispatch) => {
    dispatch({
      type: 'LIST_FAVORITES_REQ'
    });
    firebase.database()
      .ref(`/users/${uid}`)
      .once('value')
      .then((snapshot) => {
        const user = snapshot.val() || {};
        const favorites = user.favorites || [];
        dispatch({
          type: 'LIST_FAVORITES_RES',
          favorites
        });
      })
      .catch((error) => {
        dispatch({
          type: 'TOGGLE_FAVORITE_ERR',
          error: error.message
        });
      });
  };
}

export default listFavorites;
