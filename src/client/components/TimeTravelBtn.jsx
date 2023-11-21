import React from 'react';
import useStore from '../store/store';

const TimeTravelBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button onClick={() => setActiveTab('timeTravel')} className='navBtn'>
        Time Travel
      </button>
    </div>
  );
};

export default TimeTravelBtn;
