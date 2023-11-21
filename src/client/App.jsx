import React from 'react';
import D3Tree from './components/D3Tree';
import TreeBtn from './components/TreeBtn';

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
      <TreeBtn></TreeBtn>
      <D3Tree data={treeData} />
    </>
  );
};

export default App;
