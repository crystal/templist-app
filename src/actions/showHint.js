function showHint(currentHint, target) {
  return {
    type: 'SHOW_HINT',
    currentHint,
    target: target.tagName !== 'BUTTON' ? target.parentNode : target
  };
}

export default showHint;
