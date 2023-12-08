// grab the users application store
const store = window.store;

function findReactComponents(element) {
  const components = [];

  function findComponentNames(fiberNode) {
    // Check if the node is a React component and has a name, excluding 'div' and 'h1'
    const isComponent =
      fiberNode &&
      fiberNode.elementType &&
      fiberNode.elementType.name &&
      fiberNode.elementType.name == 'div' &&
      fiberNode.elementType.name == 'h1';
    const isNotHtmlElement =
      fiberNode && fiberNode.type && typeof fiberNode.type === 'function';

    if (isComponent || isNotHtmlElement) {
      // Only push component names that are not 'div' or 'h1'
      const name = fiberNode.elementType.name || fiberNode.type.name;
      components.push(name);
    }

    if (
      fiberNode &&
      fiberNode.stateNode &&
      fiberNode.stateNode.nodeType === 1
    ) {
      let childFiber = fiberNode.child;
      while (childFiber) {
        findComponentNames(childFiber);
        childFiber = childFiber.sibling;
      }
    }
  }

  Array.from(element.children).forEach((child) => {
    // Find the internal React fiber node
    const key = Object.keys(child).find((key) =>
      key.startsWith('__reactFiber$')
    );
    const fiberNode = child[key];
    if (fiberNode) {
      findComponentNames(fiberNode);
    }
  });

  return components;
}

const rootElement = document.getElementById('root');
const reactComponents = findReactComponents(rootElement);

function hierarchyConv(state, maxDepth = 10) {
  const rootNode = {
    name: 'state',
    children: [],
  };

  const visited = new Set();

  function addNodeToTree(key, value, parent, depth) {
    if (depth > maxDepth) {
      parent.children.push({ name: '[Max Depth Exceeded]' });
      return;
    }

    if (visited.has(value)) {
      parent.children.push({ name: '[Circular]' });
      return;
    }

    if (typeof value === 'object' && value !== null) {
      visited.add(value);

      const newNode = { name: key, children: [] };
      Object.entries(value).forEach(([subKey, subValue]) => {
        addNodeToTree(subKey, subValue, newNode, depth + 1);
      });

      if (newNode.children.length === 0) {
        delete newNode.children;
      } else {
        parent.children.push(newNode);
      }
    } else {
      // When the value is not an object, use it as the name of the node.
      parent.children.push({ name: String(value) });
    }
  }

  Object.entries(state).forEach(([key, value]) => {
    addNodeToTree(key, value, rootNode, 0);
  });

  return rootNode;
}

const d3hierarchy = hierarchyConv(rootElement);
const d3hierarchy2 = hierarchyConv(reactComponents);

// Send the components data to the content script
setInterval(() => {
  window.postMessage({
    type: 'REACT_COMPONENTS',
    data: JSON.stringify(d3hierarchy2),
  });
  window.postMessage({
    type: 'ROOT_DIV',
    data: JSON.stringify(d3hierarchy),
  });
}, 1000);
