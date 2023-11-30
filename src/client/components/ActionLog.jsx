import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useStore from '../store/store';
import Diff from './Diff';

const ActionLog = () => {
  const { diffArray, setPrevState, setNextState } = useStore();
  const [selectedDiv, setSelectedDiv] = useState(null);

  console.log(diffArray);

  // Function to handle the click event on the "Diff" button
  const handleDiffButtonClick = (diffObj) => {
    // Setting the previous and next state based on the clicked diff
    setPrevState(diffObj.prevState);
    setNextState(diffObj.nextState);

    // set the selected div to be diff Obj
    setSelectedDiv(diffObj);
  };

  // Rendering the component structure
  return (
    <div>
      <div
        className='action-log border-b-2 border-lt-grey'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '650px',
        }}
      >
        <h1 className='text-center text-xl font-bold text-lt-grey'>Action Log</h1>
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
                    ? 'flex flex-row justify-between w-96 text-center p-2 bg-blue rounded-md my-2'
                    : 'flex flex-row justify-between w-96 text-center p-2 bg-lt-grey rounded-md my-2'
                }
              >
                <p className='flex items-center justify-self-center pr-5 font-bold text-dk-navy'>{diffObj.action}</p>
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
      <div className='diffClass'>
        <Diff />
      </div>
    </div>
  );
};

export default ActionLog;
