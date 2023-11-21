// button to render the time travel component

import React from 'react';
import useStore from '../store/store';

const ActionLogBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button onClick={() => setActiveTab('actionLog')} className='navBtn'>
        Action Log
      </button>
    </div>
  );
};

export default ActionLogBtn;
