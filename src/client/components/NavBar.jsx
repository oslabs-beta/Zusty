// nav bar to hold the three buttons - time travel, tree, store
import TimeTravelBtn from './TimeTravelBtn';
import TreeBtn from './TreeBtn';
import StoreBtn from './StoreBtn';
import React from 'react';

const Navigation = () => {
  return (
    <div className='nav'>
      <TimeTravelBtn />
      <TreeBtn />
      <StoreBtn />
    </div>
  );
};

export default Navigation;
