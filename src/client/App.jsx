import React from 'react';
import D3Tree from './components/D3Tree';
import Navigation from './components/NavBar';

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
    <>
      <Navigation />
      <D3Tree data={treeData} />
    </>
  );
};

export default App;
