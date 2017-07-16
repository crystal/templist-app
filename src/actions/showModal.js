function showModal(currentModal, data = {}) {
  return {
    type: 'SHOW_MODAL',
    currentModal,
    data
  };
}

export default showModal;
