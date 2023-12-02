import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useStore from '../store/store';
import Diff from './Diff';

const ActionLog = () => {
  const { diffArray, setPrevState, setNextState } = useStore();
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [showRenderTimes, setShowRenderTimes] = useState(false);

  const handleToggleChange = () => {
    setShowRenderTimes((prev) => !prev);
  };

  // Function to handle the click event on the "Diff" button
  const handleDiffButtonClick = (diffObj) => {
    // Setting the previous and next state based on the clicked diff
    setPrevState(diffObj.prevState);
    setNextState(diffObj.nextState);

    // set the selected div to be diff Obj
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

  // Rendering the component structure
  return (
    <div>
      <label className='relative inline-flex items-center mb-5 cursor-pointer'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          onChange={handleToggleChange}
        />
        <div className="w-9 h-5 border-2 border-white peer-focus:outline-white peer-focus:ring-4 dark:peer-focus:ring-blue rounded-full peer dark:bg-lt-grey peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-lt-grey after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-lt-grey peer-checked:bg-blue"></div>
        <span className='ms-3 text-sm font-medium text-white dark:text-white'>
          Show Render Times
        </span>
      </label>
      <div
        className='action-log border-b-2 border-lt-grey border-none m-3'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '650px',
        }}
      >
        <h1 className='text-center text-xl font-bold text-white m-2'>
          Action Log
        </h1>
        <div className='flex flex-col h-fit' style={{ overflowY: 'auto' }}>
          {/* Diff Logs Column */}
          <div
            className='flex flex-col items-center w-full justify-center'
            style={{ overflowY: 'auto' }}
          >
            {/* Mapping over diffArray to display each diff */}
            {diffArray.map((diffObj) => (
              <div
                key={uuid()}
                // Applying dynamic styling based on the selected diff
                className={
                  selectedDiv === diffObj
                    ? 'flex flex-row items-center justify-between w-96 text-center p-2 bg-blue rounded-md m-3'
                    : 'flex flex-row items-center justify-between w-96 text-center p-2 bg-lt-grey rounded-md m-3 '
                }
              >
                <div
                  className={`rounded-full w-4 h-4 ${renderTimeCheck(diffObj)}`}
                ></div>
                <p className='flex items-center justify-self-center pr-5 font-bold text-dk-navy'>
                  {diffObj.action}
                </p>
                {showRenderTimes && (
                  <p className='flex items-center justify-self-center pr-5 font-bold text-dk-navy'>
                    {diffObj.actionCompleteTime < 1
                      ? `< 1 ms`
                      : `${diffObj.actionCompleteTime} ms`}
                  </p>
                )}

                {/* Button to trigger the "Diff" action */}
                <button
                  className='flex self-end justify-self-end bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
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
      <div className='mb-0'>
        <Diff />
      </div>
    </div>
  );
};

export default ActionLog;
