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
          className="flex flex-col justify-center item-center text-left p-2 bg-lt-grey text-dk-navy rounded-md my-2 w-11/12 overflow-auto backdrop-opacity-30	hover:backdrop-opacity-100"
        >
          <ul>
            <li
              className="bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg p-2 mt-2 mb-2"
              key={uuid()}
            >
              <span className="font-bold mr-2">Timestamp:</span>
              {`${new Date(el.timestamp).toLocaleString()}`}
            </li>
            {/* Display the key-value pairs */}
            {Object.keys(el.stateSnapshot).map((key) => (
              <li
                className="bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg p-2 mt-2 mb-2"
                key={uuid()}
              >
                <span className="font-bold mr-2">{`${key}:`}</span>
                {`${JSON.stringify(el.stateSnapshot[key])}`}
              </li>
            ))}
          </ul>
        </div>
      ))
    );
  }, [stateSnapshotArray]);

  return (
    <div
      className="flex flex-col border-t-2 border-lt-grey w-full m-auto"
      style={{ height: '1000px', overflow: 'auto' }}
    >
      <h1 className="text-center text-xl font-bold text-lt-grey my-5">
        State Snapshots
      </h1>
      <div className="flex flex-col justify-center items-center gap-1.5">
        {updatedRenderedSnapshots}
      </div>
    </div>
  );
};

export default StateSnapshots;
