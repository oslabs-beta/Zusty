import React from 'react';
import useStore from './store/store';
import D3Tree from './components/D3Tree';
import Navigation from './components/NavBar';
import ActionLog from './components/ActionLog';
import TimeTravel from './components/TimeTravel';

const App = () => {
  const activeTab = useStore((state) => state.activeTab);

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
    <div className='flex h-screen'>
      <div className='w-1/3 bg-blue-100'>
        <Navigation />
        <ActionLog />
      </div>
      <div className='w-2/3'>
        {activeTab === 'tree' && <D3Tree data={treeData} />}
        {activeTab === 'timeTravel' && <TimeTravel />}
      </div>
    </div>
  );
};

export default App;
