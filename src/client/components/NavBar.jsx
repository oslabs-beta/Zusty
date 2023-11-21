// nav bar to hold the three buttons - time travel, tree, store
import React from 'react';
import TreeBtn from './TreeBtn';
import StoreBtn from './StoreBtn';
import TimeTravelBtn from './TimeTravelBtn';
import ActionLogBtn from './ActionLogBtn';

const Navigation = () => {
  return (
    <div className='flex justify-around my-2'>
      <ActionLogBtn />
      <TimeTravelBtn />
      <TreeBtn />
      <StoreBtn />
    </div>
  );
};

export default Navigation;
