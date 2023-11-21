import React from 'react';
import D3Tree from './components/D3Tree';
import Navigation from './components/NavBar';
import ActionLog from './components/ActionLog';

const App = () => {
  const treeData = {
    name: 'Board',
    children: [
      {
        name: 'Rows',
        children: [{ name: 'Box' }, { name: 'Box' }],
      },
      {
        name: 'Rows',
        children: [
          { name: 'Box' },
          {
            name: 'Box',
            children: [{ name: 'Box-Child' }, { name: 'Box-Child' }],
          },
        ],
      },
    ],
  };

  return (
    <div className='main-container'>
      <div className='left-container'>
        <Navigation />
        <ActionLog />
      </div>
      <div className='right-container'>
        <D3Tree data={treeData} />
      </div>
    </div>
  );
};

export default App;
