// button to render the time travel component

import React from 'react';
import useStore from '../store/store';

const ActionLogBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button
        onClick={() => setActiveTab('actionLog')}
        className='flex flex-shrink bg-light-codebg text-white hover:bg-code-o text-gray-800 font-semibold py-2 px-4 border border-light-codebg rounded shadow'
      >
        Action Log
      </button>
    </div>
  );
};

export default ActionLogBtn;
