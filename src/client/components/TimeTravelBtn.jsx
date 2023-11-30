import React from 'react';
import useStore from '../store/store';

const TimeTravelBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button onClick={() => setActiveTab('timeTravel')} className="bg-lt-grey text-dk-navy hover:bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Time Travel
      </button>
    </div>
  );
};

export default TimeTravelBtn;
