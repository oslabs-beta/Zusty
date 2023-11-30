import React from 'react';
import useStore from '../store/store';

const StoreBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);
  return (
    <div className='button'>
      <button onClick={() => setActiveTab('storeBtn')} className='navBtn'>
        Store
      </button>
    </div>
  );
};

export default StoreBtn;
