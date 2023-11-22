// Component to show what actions triggered state change
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

const ActionLog = () => {
  const [actions, setActions] = useState([
    'state 1',
    'state 2',
    'state 3',
    'state 4',
    'state 5',
  ]);

  const addAction = () => {
    const item = uuid();
    const newState = [...actions, item];
    setActions(newState);
  };

  const clearActions = () => {
    setActions([]);
  };

  return (
    <div
      className='action-log border-b-2 border-blue-500'
      style={{ height: '800px', overflow: 'auto' }}
    >
      <h1 className='text-center text-xl front-text-bold'>Action Log</h1>
      <button className='btn' onClick={addAction}>
        Add Action
      </button>
      <div className='flex flex-col p-2 h-2/3'>
        {actions.map((el) => {
          return (
            <div
              key={uuid()}
              className='text-center w-full p-2 bg-blue-400 rounded-md my-2'
            >
              <p>{el}</p>
            </div>
          );
        })}
        <button className='btn' onClick={clearActions}>
          Clear Actions
        </button>
      </div>
    </div>
  );
};

export default ActionLog;
