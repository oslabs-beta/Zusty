import React from 'react';
import ReactJson from '@microlink/react-json-view';
import useStore from '../store/store';

const Diff = () => {
  // Destructuring prevState and nextState from the state returned by useStore
  const { prevState, nextState } = useStore();

  // Function to render key-value pairs of an object as list items
  const renderObjectProperties = (obj) => {
    // Mapping over entries (key-value pairs) of the object
    if (obj && typeof obj === 'object') {
      return (
        <ReactJson
          src={obj}
          theme="hopscotch"
          displayDataTypes={false}
          enableClipboard={false}
        />
      );
      // return Object.entries(obj).map(([key, value]) => (
      //   <li className="text-gray text-sm text-left m-2" key={key}>
      //     <strong className="text-white">{key}:</strong> {JSON.stringify(value)}
      //   </li>
      // ));
    }
  };

  // Rendering the component structure
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex grow flex-col self-center border-2 border-lt-grey overflow-auto h-full p-4">
        <h2 className="text-left text-xl text-white font-bold overflow-auto m-1">
          State Before Action:
        </h2>
        {/* Rendering a list of key-value pairs for parsedPrevState */}
        <ul>{renderObjectProperties(prevState)}</ul>
      </div>
      <div className="flex grow flex-col self-center border-2 border-lt-grey overflow-auto h-full p-4">
        <h2 className="text-left text-xl text-white font-bold overflow-auto m-1">
          State After Action:
        </h2>
        {/* Rendering a list of key-value pairs for parsedNextState */}
        <ul>{renderObjectProperties(nextState)}</ul>
      </div>
    </div>
  );
};

export default Diff;
