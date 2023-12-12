import React from 'react';
import useStore from '../store/store';

const StoreBtn = ({ onClick, className }) => {
  const { setActiveTab } = useStore();

  const handleClick = () => {
    setActiveTab('storeBtn');
    onClick();
  };
  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex-grow flex-shrink bg-light-codebg text-white hover:bg-code-o font-semibold py-2 px-4 border border-light-codebg rounded shadow ${className}`}
      >
        Store
      </button>
    </div>
  );
};

export default StoreBtn;
