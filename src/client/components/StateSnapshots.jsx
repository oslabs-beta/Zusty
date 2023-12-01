import React, { useEffect, useState } from 'react';
import useStore from '../store/store';
import uuid from 'react-uuid';

const StateSnapshots = () => {
  // Bring in stateSnapshotArray from Zustand store
  const { stateSnapshotArray } = useStore();

  // Declare updatedRenderedSnapshots using useState
  const [updatedRenderedSnapshots, setUpdatedRenderedSnapshots] = useState([]);

  // To handle toggling to JSON format display
  const [showAsJSON, setShowAsJSON] = useState(false);

  // useEffect so that we get any updates when a snapshot is added to the stateSnapshotArray in the store
  useEffect(() => {
    // Update the state using setUpdatedRenderedSnapshots
    setUpdatedRenderedSnapshots(
      stateSnapshotArray.map((el) => (
        <div
          key={uuid()}
          className='flex flex-col justify-center item-center text-left p-2 bg-lt-grey text-dk-navy rounded-md my-2 w-11/12 overflow-auto backdrop-opacity-30	hover:backdrop-opacity-100'
        >
          <ul>
            <li
              className='bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg p-2 mt-2 mb-2'
              key={uuid()}
            >
              <span className='font-bold mr-2'>Timestamp:</span>
              {`${new Date(el.timestamp).toLocaleString()}`}
            </li>
            {showAsJSON ? (
              <li
                className='bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg p-2 mt-2 mb-2'
                key={uuid()}
              >
                {JSON.stringify(el.stateSnapshot)}
              </li>
            ) : (
              Object.keys(el.stateSnapshot).map((key) => (
                <li
                  className='bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg p-2 mt-2 mb-2'
                  key={uuid()}
                >
                  <span className='font-bold mr-2'>{`${key}:`}</span>
                  {`${JSON.stringify(el.stateSnapshot[key])}`}
                </li>
              ))
            )}
          </ul>
        </div>
      ))
    );
  }, [stateSnapshotArray, showAsJSON]);

  const handleToggleChange = () => {
    setShowAsJSON((prev) => !prev);
  };

  return (
    <div
      className='flex flex-col border-t-2 border-lt-grey w-full m-auto'
      style={{ height: '93vh', overflow: 'auto' }}
    >
      <label class='relative inline-flex items-center mb-5 cursor-pointer'>
        <input
          type='checkbox'
          value=''
          class='sr-only peer'
          onChange={handleToggleChange}
        ></input>
        <div class="w-9 h-5 peer-focus:outline-white peer-focus:ring-4 dark:peer-focus:ring-blue rounded-full peer dark:bg-lt-grey peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-lt-grey after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-lt-grey peer-checked:bg-blue"></div>
        <span class='ms-3 text-sm font-medium text-white dark:text-white'>
          JSON Format
        </span>
      </label>

      <h1 className='text-center text-xl font-bold text-white my-5'>
        State Snapshots
      </h1>
      <div className='flex flex-col justify-center items-center gap-1.5'>
        {updatedRenderedSnapshots}
      </div>
    </div>
  );
};

export default StateSnapshots;
