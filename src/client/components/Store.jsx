import React from 'react';
import useStore from '../store/store';
import ReactJson from '@microlink/react-json-view';

const Store = () => {
  const { store } = useStore();
  // console.log(store);

  //change [object Object] to {}
  for (let key in store) {
    if (store[key] === '[object Object]') {
      store[key] = '{}';
      // console.log('change', store[key]);
    }
  }

  //board: "{}"
  return (
    <>
      <p className="text-center text-xl font-bold text-white my-5 mt-3 mb-0">
        Store:
      </p>
      <div
        className="flex justify-center align-center h-10/12"
        style={{ overflowY: 'auto', height: '93vh' }}
      >
        <ReactJson
          src={store}
          theme="hopscotch"
          displayDataTypes={false}
          enableClipboard={false}
          quotesOnKeys={false}
          style={{ fontSize: '12px' }}
        />
      </div>
    </>
  );
};

export default Store;
