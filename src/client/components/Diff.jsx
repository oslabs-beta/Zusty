import React from 'react';
import ReactJson from '@microlink/react-json-view';
import useStore from '../store/store';

const Diff = () => {
  const { prevState, nextState } = useStore();

  const renderObjectProperties = (obj) => {
    // Mapping over entries (key-value pairs) of the object
    if (obj && typeof obj === 'object') {
      return (
        <ReactJson
          src={obj}
          theme='hopscotch'
          displayDataTypes={false}
          enableClipboard={false}
        />
      );
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex grow flex-col self-center border-2 border-lt-grey overflow-auto h-full p-4'>
        <h2 className='text-left text-xl text-white font-bold overflow-auto m-1'>
          State Before Action:
        </h2>
        <ul>{renderObjectProperties(prevState)}</ul>
      </div>
      <div className='flex grow flex-col self-center border-2 border-lt-grey overflow-auto h-full p-4'>
        <h2 className='text-left text-xl text-white font-bold overflow-auto m-1'>
          State After Action:
        </h2>
        <ul>{renderObjectProperties(nextState)}</ul>
      </div>
    </div>
  );
};

export default Diff;
