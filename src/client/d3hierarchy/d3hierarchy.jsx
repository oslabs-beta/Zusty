function hierarchyConv(state) {
  const rootNode = {
    name: 'root',
    children: [],
  };

  function addNodeToTree(key, value, parent) {
    // Log the current level of recursion
    console.log('Processing:', key, value);

    const newNode = {
      name: key,
      children: [],
    };

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        addNodeToTree(`[${index}]`, item, newNode);
      });
    } else if (
      typeof value === 'object' &&
      value !== null &&
      Object.keys(value).length > 0
    ) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        addNodeToTree(subKey, subValue, newNode);
      });
    } else {
      newNode.attributes = { value: value };
    }

    parent.children.push(newNode);
  }

  addNodeToTree('state', state, rootNode);
  console.log('Root Node:', rootNode);
  return rootNode.children[0];
}

export default hierarchyConv;
