function showHint(currentHint, target) {
  return {
    type: 'SHOW_HINT',
    currentHint,
    target
  };
}

export default showHint;
