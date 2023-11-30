import React from 'react';
import useStore from '../store/store';

const TreeBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button onClick={() => setActiveTab('tree')} className="bg-lt-grey text-dk-navy hover:bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Tree
      </button>
    </div>
  );
};

export default TreeBtn;
