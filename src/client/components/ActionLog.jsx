// Component to show what actions triggered state change
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useStore from '../store/store';
import Diff from './Diff';

const ActionLog = () => {
  // const [actions, setActions] = useState([
  //   'state 1',
  //   'state 2',
  //   'state 3',
  //   'state 4',
  //   'state 5',
  // ]);

  // const addAction = () => {
  //   const item = uuid();
  //   const newState = [...actions, item];
  //   setActions(newState);
  // };

  // const clearActions = () => {
  //   setActions([]);
  // };
  const { actionSnapshotArray, prevState, nextState } = useStore();

  // Declare updatedRenderedSnapshots using useState
  const [updatedRenderedActions, setUpdatedRenderedActions] = useState([]);

  // useEffect so that we get any updates when a snapshot is added to the stateSnapshotArray in the store
  // useEffect(() => {
  //   // Update the state using setUpdatedRenderedSnapshots
  //   setUpdatedRenderedActions(
  //     actionSnapshotArray.map((el) => (
  //       <div
  //         key={uuid()}
  //         className='text-center p-2 bg-blue-400 rounded-md my-2 w-9/12'
  //       >
  //         <p>{el}</p>
  //       </div>
  //     ))
  //   );
  // }, [actionSnapshotArray]);

  return (
    <div
      className='action-log border-b-2 border-blue-500'
      style={{ display: 'flex', flexDirection: 'column', height: '800px' }}
    >
      <h1 className='text-center text-xl font-bold'>Action Log</h1>
      <div className='flex flex-row h-2/3'>
        {/* Action Logs Column */}
        <div className='flex flex-col w-3/4' style={{ overflowY: 'auto' }}>
          {actionSnapshotArray.map((el) => (
            <div
              key={uuid()}
              className='text-center p-2 bg-blue-400 rounded-md my-2'
            >
              <p>{el}</p>
              <button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                Diff
              </button>
            </div>
          ))}
        </div>

        {/* Previous State and State After Action Column
        <div className='flex flex-col w-1/4' style={{ overflowY: 'auto' }}>
          <p className='text-center p-2 bg-blue-400 rounded-md my-2'>
            Previous State: {prevState}
          </p>
          <p className='text-center p-2 bg-blue-400 rounded-md my-2'>
            State After Action: {nextState}
          </p>
        </div> */}
      </div>
      <Diff />
    </div>
  );
};

export default ActionLog;
