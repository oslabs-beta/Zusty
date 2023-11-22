import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import uuid from 'react-uuid';

const StateSnapshots = () => {
  // Bring in stateSnapshotArray from Zustand store
  const { stateSnapshotArray } = useStore();

  // Declare updatedRenderedSnapshots using useState
  const [updatedRenderedSnapshots, setUpdatedRenderedSnapshots] = useState([]);

  // useEffect so that we get any updates when a snapshot is added to the stateSnapshotArray in the store
  useEffect(() => {
    // Update the state using setUpdatedRenderedSnapshots
    setUpdatedRenderedSnapshots(
      stateSnapshotArray.map((el) => (
        <div
          key={uuid()}
          className='text-center p-2 bg-blue-400 rounded-md my-2 w-9/12'
        >
          <ul>
            {Object.keys(el).map((key) => (
              <li key={uuid()}>{JSON.stringify(el[key])}</li>
            ))}
          </ul>
        </div>
      ))
    );
  }, [stateSnapshotArray]);

  return (
    <div
      className='border-solid border-2 border-blue-600 w-full m-auto'
      style={{ height: '800px', overflow: 'auto' }}
    >
      <h1 className='text-center text-xl front-text-bold'>State Snapshots</h1>
      <div>{updatedRenderedSnapshots}</div>
    </div>
  );
};

export default StateSnapshots;
