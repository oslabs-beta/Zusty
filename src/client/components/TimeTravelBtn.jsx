// button to render the time travel component

import React from 'react';
import useStore from '../store/store';

const TimeTravelBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button
        onClick={() => setActiveTab('timeTravel')}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Time Travel
      </button>
    </div>
  );
};

export default TimeTravelBtn;
