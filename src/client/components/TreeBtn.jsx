import React from 'react';
import useStore from '../store/store';

const TreeBtn = () => {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <div>
      <button onClick={() => setActiveTab('tree')} className='navBtn'>
        Tree
      </button>
    </div>
  );
};

export default TreeBtn;
