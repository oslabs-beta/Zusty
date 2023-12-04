import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useStore from '../store/store';
import Diff from './Diff';

const ActionLog = () => {
  const { diffArray, setPrevState, setNextState } = useStore();
  // selectedDiv for dyamically highlighting elements when diff button is clicked
  const [selectedDiv, setSelectedDiv] = useState(null);
  // showRenderTimes for toggle to show or hide metrics
  const [showRenderTimes, setShowRenderTimes] = useState(false);

  const handleToggleChange = () => {
    setShowRenderTimes((prev) => !prev);
  };

  const handleDiffButtonClick = (diffObj) => {
    // Setting the previous and next state based on the component where diff is clicked
    setPrevState(diffObj.prevState);
    setNextState(diffObj.nextState);

    // set the selected div to be diff Obj for dynamic highlighting
    setSelectedDiv(diffObj);
  };

  const renderTimeCheck = (diffObj) => {
    if (diffObj.actionCompleteTime >= 750) {
      return 'bg-red-700';
    } else if (
      diffObj.actionCompleteTime < 750 &&
      diffObj.actionCompleteTime > 300
    ) {
      return 'bg-yellow-700';
    } else {
      return 'bg-green-700';
    }
  };

  return (
    <div>
      {/* Toggle Switch */}
      <label className="mt-3 ml-2 relative inline-flex items-center mb-5 cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={handleToggleChange}
        />
        <div className="w-9 h-5 border-2 border-white peer-focus:outline-white peer-focus:ring-4 dark:peer-focus:ring-blue rounded-full peer dark:bg-lt-grey peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-lt-grey after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-lt-grey peer-checked:bg-blue"></div>
        <span className="ms-3 text-sm font-medium text-white dark:text-white">
          Show Render Times
        </span>
      </label>
      {/* Action Log Section */}

      <div className="flex flex-row justify-between bg-code-bg">
        <div
          className="flex items-center action-log border-b-2 border-lt-grey border-none rounded-md"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '91vh',
            overflowY: 'auto',
          }}
        >
          <h1 className="text-center text-xl font-bold text-white m-2 w-72 mb-0 mt-0">
            Action Log
          </h1>

          <div className="flex flex-col h-fit" style={{ overflow: 'auto' }}>
            <div
              className="flex flex-col items-center w-full justify-center
              "
              style={{ overflowY: 'auto' }}
            >
              {/* Mapping over diffArray to display each diff */}
              {diffArray.map((diffObj) => (
                <div
                  key={uuid()}
                  // Applying dynamic styling based on the selected diff
                  className={
                    selectedDiv === diffObj
                      ? 'flex flex-row items-center justify-between w-72 min-w-max text-center p-2 bg-code-o rounded-md m-2'
                      : 'flex flex-row items-center justify-between w-72 min-w-max text-center p-2 bg-light-codebg rounded-md m-2 '
                  }
                >
                  {/* Metrics status circle */}
                  <div
                    className={`rounded-full w-2 h-2 ${renderTimeCheck(
                      diffObj
                    )}`}
                  ></div>
                  <p className="flex items-center justify-self-center pr-5 font-bold text-white">
                    {diffObj.action}
                  </p>
                  {/* Showing render times if toggle switched */}
                  {showRenderTimes && (
                    <p className="flex items-center justify-self-center pr-5 font-bold text-dk-navy">
                      {diffObj.actionCompleteTime < 1
                        ? `< 1 ms`
                        : `${diffObj.actionCompleteTime.toFixed(2)} ms`}
                    </p>
                  )}
                  <button
                    className="flex self-end justify-self-end bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-code-o rounded"
                    // Click event handler to update the previous and next state
                    onClick={() => {
                      handleDiffButtonClick(diffObj);
                    }}
                  >
                    Diff
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Rendering the Diff component */}
        <div className=" w-7/12">
          <Diff />
        </div>
      </div>
    </div>
  );
};

export default ActionLog;
