import React, { useState } from 'react';
import ReactJson from '@microlink/react-json-view';
import useStore from '../store/store';
import uuid from 'react-uuid';

const StateSnapshots = () => {
  const { stateSnapshotArray } = useStore();

  // To handle toggling to JSON format display
  const [showAsJSON, setShowAsJSON] = useState(true); // Set to true for default JSON view

  const handleToggleChange = () => {
    setShowAsJSON((prev) => !prev);
  };

  return (
    <div
      className='flex flex-col border-t-2 border-lt-grey w-full m-auto'
      style={{ height: '93vh', overflow: 'auto' }}
    >
      {/* Toggle Switch */}
      <label className='relative inline-flex items-center mb-2 mt-2 ml-2 cursor-pointer'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          onChange={handleToggleChange}
        />
        <div className="w-9 h-5 border-2 border-white peer-focus:outline-white peer-focus:ring-4 dark:peer-focus:ring-blue rounded-full peer dark:bg-lt-grey peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-lt-grey after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-lt-grey peer-checked:bg-blue"></div>
        <span className='ms-3 text-sm font-medium text-white dark:text-white'>
          Show As List
        </span>
      </label>
      {/* State Snapshot Section */}
      <h1 className='text-center text-xl font-bold text-white my-5 mt-0 mb-0'>
        State Snapshots
      </h1>
      {/* Map through snapshots to display in either JSON format or list view depending on toggle switch */}
      <div className='flex flex-col justify-center items-center gap-1.5'>
        {stateSnapshotArray.map((el) => (
          <div
            key={uuid()}
            className='flex flex-col justify-center item-center text-left p-2 bg-code-bg text-white rounded-md my-2 w-11/12 overflow-auto backdrop-opacity-30	hover:backdrop-opacity-100 border border-gray-200'
          >
            <ul>
              <li
                className='bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg p-2 mt-2 mb-2'
                key={uuid()}
              >
                <span className='font-bold mr-2 text-white'>Timestamp:</span>
                {`${new Date(el.timestamp).toLocaleString()}`}
              </li>
              {showAsJSON ? (
                <ReactJson
                  src={el.stateSnapshot}
                  theme='hopscotch'
                  displayDataTypes={false}
                  enableClipboard={false}
                  quotesOnKeys={false}
                  style={{ fontSize: '12px' }}
                />
              ) : (
                Object.keys(el.stateSnapshot).map((key) => (
                  <li
                    className='bg-white bg-opacity-20 hover:bg-opacity-40 rounded-lg p-2 mt-2 mb-2 text-white'
                    key={uuid()}
                  >
                    <span className='font-bold mr-2 text-white'>{`${key}:`}</span>
                    {`${JSON.stringify(el.stateSnapshot[key])}`}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateSnapshots;
