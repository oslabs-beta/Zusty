import React from 'react';
import hierarchyConv from '../../d3hierarchy/d3hierarchy';
import D3Tree from '../D3Tree';
import { useState } from 'react';

const TreeRender = () => {
  const [state, setState] = useState({});

  const hierarchyData = hierarchyConv(state);

  return (
    <div>
      <D3Tree data={hierarchyData} />
    </div>
  );
};

export default TreeRender;
