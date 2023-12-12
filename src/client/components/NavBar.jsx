import React from 'react';
import TreeBtn from './TreeBtn';
import StoreBtn from './StoreBtn';
import ActionLogBtn from './ActionLogBtn';
import useStore from '../store/store';

const Navigation = () => {
  const { storeButton, treeButton, actionButton, setActiveButton } = useStore();
  //props being passed down to their respective button components for highlighting
  return (
    <div className='flex items-center justify-around'>
      <ActionLogBtn
        onClick={() => setActiveButton('actionButton')}
        className={`${
          actionButton ? 'bg-orange-500' : 'bg-light-codebg'
        } flex-grow`}
      />
      <TreeBtn
        onClick={() => setActiveButton('treeButton')}
        className={`${
          treeButton ? 'bg-orange-500' : 'light-codebg'
        }  flex-grow`}
      />
      <StoreBtn
        onClick={() => setActiveButton('storeButton')}
        className={`${
          storeButton ? 'bg-orange-500' : 'bg-light-codebg'
        }  flex-grow`}
      />
    </div>
  );
};

export default Navigation;
