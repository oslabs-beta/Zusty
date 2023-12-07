import React from 'react';
import useStore from '../store/store';
import ReactJson from '@microlink/react-json-view';

const Store = () => {
  const { store } = useStore();

  return (
    <div>
      <ReactJson
        src={store}
        theme='hopscotch'
        displayDataTypes={false}
        enableClipboard={false}
      />
    </div>
  );
};

export default Store;
