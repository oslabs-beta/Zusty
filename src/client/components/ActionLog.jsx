// Component to show what actions triggered state change
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useStore from '../store/store';
import Diff from './Diff';

const ActionLog = () => {
  const { actionSnapshotArray, prevState, nextState } = useStore();

  // Declare updatedRenderedSnapshots using useState
  const [updatedRenderedActions, setUpdatedRenderedActions] = useState([]);

  return (
    <div>
      <div
        className='action-log border-b-2 border-blue-500'
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '650px',
        }}
      >
        <h1 className='text-center text-xl font-bold'>Action Log</h1>
        <div className='flex flex-col h-fit' style={{ overflowY: 'auto' }}>
          {/* Action Logs Column */}
          <div
            className='flex flex-col w-2/3 justify-self-center'
            style={{ overflowY: 'auto' }}
          >
            {actionSnapshotArray.map((el) => (
              <div
                key={uuid()}
                className='text-center p-2 bg-blue-400 rounded-md my-2 place-content-center'
              >
                <p>{el}</p>
                <button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                  Diff
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='diffClass'>
        <Diff />
      </div>
    </div>
  );
};

export default ActionLog;
