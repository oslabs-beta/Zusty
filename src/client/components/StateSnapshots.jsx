// Previous state snapshots
// time travel component
import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';

const StateSnapshots = () => {
  const [stateSnapshot, setStateSnapshot] = useState([
    'state snapshot 1',
    'state snapshot 2',
    'state snapshot 3',
    'state snapshot 4',
    'state snapshot 5',
  ]);

  return (
    <div
      className='border-solid border-2 border-blue-600 w-full m-auto'
      style={{ height: '800px', overflow: 'auto' }}
    >
      <h1 className='text-center text-xl front-text-bold'>State Snapshots</h1>
      <div className='flex flex-col p-2 h-2/3 justify-center items-center'>
        {stateSnapshot.map((el) => {
          return (
            <div
              key={uuid()}
              className='text-center p-2 bg-blue-400 rounded-md my-2 w-9/12'
            >
              <p>{el}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StateSnapshots;
