export const renderTimeCheck = (diffObj) => {
  if (diffObj.actionCompleteTime >= 750) {
    return 'bg-red-500';
  } else if (
    diffObj.actionCompleteTime < 750 &&
    diffObj.actionCompleteTime > 300
  ) {
    return 'bg-yellow-500';
  } else {
    return 'bg-green-500';
  }
};

export const handleToggleChange = () => {
  setShowRenderTimes((prev) => !prev);
};
