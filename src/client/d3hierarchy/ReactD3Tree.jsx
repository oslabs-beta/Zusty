import React from 'react';
import Tree from 'react-d3-tree';

const ReactD3Tree = ({ data }) => {
  console.log('datainreactd3', data);

  const sampleData = {
    name: 'Root',
    children: [
      {
        name: 'Child 1',
        children: [{ name: 'Grandchild 1.1' }, { name: 'Grandchild 1.2' }],
      },
      {
        name: 'Child 2',
        children: [
          { name: 'Grandchild 2.1' },
          { name: 'Grandchild 2.2' },
          { name: 'Grandchild 2.3' },
        ],
      },
      {
        name: 'Child 3',
      },
    ],
  };

  const renderForeignObjectNode = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle r={10} onClick={toggleNode} fill="black" />
      <text
        fill="black"
        strokeWidth="1"
        y="4"
        x={nodeDatum.children ? '-13' : '13'}
        textAnchor={nodeDatum.children ? 'end' : 'start'}
      >
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes && (
        <text fill="black" strokeWidth="1" x="20" dy="20">
          value: {nodeDatum.attributes.value}
        </text>
      )}
    </g>
  );
  return (
    <div id="treeWrapper" style={{ width: '100%', height: '100vh' }}>
      {data && ( // Ensure data is not null or undefined
        <Tree
          data={sampleData}
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          depthFactor={180}
          enableLegacyTransitions={true}
          transitionDuration={600}
          separation={{ siblings: 0.3, nonSiblings: 0.6 }}
          translate={{ x: 100, y: 350 }}
          scaleExtent={{ max: 1, min: 0.1 }}
          nodeSize={{ x: 180, y: 180 }}
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({ ...rd3tProps })
          }
        />
      )}
    </div>
  );
};

export default ReactD3Tree;
