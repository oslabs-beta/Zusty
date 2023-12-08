import React from 'react';
import Tree from 'react-d3-tree';
import useStore from '../store/store';

const ReactD3Tree = () => {
  const d3data = useStore((state) => state.d3data);

  return (
    <div
      id='treeWrapper'
      style={{ width: '500px', height: '100vh', position: 'relative' }}
    >
      <Tree
        data={d3data}
        rootNodeClassName='node__root'
        branchNodeClassName='node__branch'
        leafNodeClassName='node__leaf'
        depthFactor={180}
        enableLegacyTransitions={true}
        transitionDuration={600}
        separation={{ siblings: 0.8, nonSiblings: 1.2 }}
        translate={{ x: 200, y: 350 }}
        scaleExtent={{ max: 1, min: 0.1 }}
        nodeSize={{ x: 140, y: 200 }}
      />
    </div>
  );
};

export default ReactD3Tree;
