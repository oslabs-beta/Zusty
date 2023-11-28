import React from 'react';
import useStore from '../store/store';

const Diff = () => {
  const { prevState, nextState } = useStore();

  return (
    <div className='diffContainer'>
      <div className='diffLeft overflow-auto p-4'>
        <h2 className='text-center text-xl font-bold overflow-auto'>
          Previous State:
        </h2>
        <p className='overflow-auto'>{prevState}</p>
      </div>
      <div className='diffRight overflow-auto p-4'>
        <h2 className='text-center text-xl font-bold overflow-auto'>
          State After Action:
        </h2>
        <p className='overflow-auto'>{nextState}</p>
      </div>
    </div>
  );
};

export default Diff;
