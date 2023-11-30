import React from 'react';
import useStore from '../store/store';

const Diff = () => {
  // Destructuring prevState and nextState from the state returned by useStore
  const { prevState, nextState } = useStore();

  // Function to render key-value pairs of an object as list items
  const renderObjectProperties = (obj) => {
    // Mapping over entries (key-value pairs) of the object
    if (obj && typeof obj === 'object') {
      return Object.entries(obj).map(([key, value]) => (
        <li className='text-lt-grey text-center' key={key}>
          <strong>{key}:</strong> {JSON.stringify(value)}
        </li>
      ));
    }
  };

  // Rendering the component structure
  return (
    <div className='flex flex-row justify-center items-center'>
      <div className='flex flex-col self-center mr-10 border-2 border-lt-grey overflow-auto p-4'>
        <h2 className='text-center text-xl text-lt-grey font-bold overflow-auto'>
         State Before Action:
        </h2>
        {/* Rendering a list of key-value pairs for parsedPrevState */}
        <ul>{renderObjectProperties(prevState)}</ul>
      </div>
      <div className='flex flex-col self-center border-2 border-lt-grey overflow-auto p-4'>
        <h2 className='text-center text-xl text-lt-grey font-bold overflow-auto'>
          State After Action:
        </h2>
        {/* Rendering a list of key-value pairs for parsedNextState */}
        <ul>{renderObjectProperties(nextState)}</ul>
      </div>
    </div>
  );
};

export default Diff;
