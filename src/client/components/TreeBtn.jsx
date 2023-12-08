import React from 'react';
import useStore from '../store/store';

const TreeBtn = ({ onClick, className }) => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  const handleClick = () => {
    setActiveTab('tree');
    onClick();
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`flex-grow flex-shrink bg-light-codebg text-white hover:bg-code-o font-semibold py-2 px-4 border border-light-codebg rounded shadow ${className}`}
      >
        Tree
      </button>
    </div>
  );
};

export default TreeBtn;
