import React from 'react';
import useStore from '../store/store';

const StoreBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);
  return (
    <div className="flex flex-shrink bg-light-codebg text-white hover:bg-code-o text-gray-800 font-semibold py-2 px-4 text-center border border-light-codebg rounded shadow transition duration-400">
      <button onClick={() => setActiveTab('storeBtn')} className="navBtn">
        Store
      </button>
    </div>
  );
};

export default StoreBtn;
