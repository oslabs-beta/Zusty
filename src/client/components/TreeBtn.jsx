// button to render the component tree

import React from 'react';
import useStore from '../store/store';

const TreeBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button
        onClick={() => setActiveTab('tree')}
        class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
      >
        Tree
      </button>
    </div>
  );
};

export default TreeBtn;
