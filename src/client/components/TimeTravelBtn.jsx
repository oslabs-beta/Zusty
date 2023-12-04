import React from 'react';
import useStore from '../store/store';

const TimeTravelBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div className="flex grow">
      <button
        onClick={() => setActiveTab('timeTravel')}
        className="flex w-30 flex-shrink bg-lt-grey text-white hover:bg-code-o text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      >
        Time Travel
      </button>
    </div>
  );
};

export default TimeTravelBtn;
