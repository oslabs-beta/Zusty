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
    }
  };

  // Rendering the component structure
  const containerStyle = {
    height: 'calc(47vh - 3rem)', // Half of the viewport height minus some spacing.
    overflow: 'auto', // Will add scrollbars when content overflows.
  };

  return (
    <div className="w-full h-10/12">
      <h2 className="text-center text-xl text-white font-bold mb-2">
        State Before Action
      </h2>
      <div
        className="border-2 border-lt-grey p-4 mb-4 rounded-md bg-code-bg"
        style={containerStyle}
      >
        {renderObjectProperties(prevState)}
      </div>
      <h2 className="text-center text-xl text-white font-bold mb-2">
        State After Action:
      </h2>
      <div
        className="border-2 border-lt-grey p-4 rounded-md bg-code-bg"
        style={containerStyle}
      >
        {renderObjectProperties(nextState)}
      </div>
    </div>
  );
};

export default Diff;
