// nav bar to hold the three buttons - time travel, tree, store
import React from 'react';
import TreeBtn from './TreeBtn';
import StoreBtn from './StoreBtn';
import ActionLogBtn from './ActionLogBtn';

const Navigation = () => {
  return (
    <div className='flex items-center justify-around my-2'>
      <ActionLogBtn />
      <TreeBtn />
      <StoreBtn />
    </div>
  );
};

export default Navigation;
