// grab the users application store
const store = window.store;

function findReactComponents(element) {
  const components = [];

  function findComponentNames(fiberNode) {
    const isNamedComponent =
      fiberNode &&
      fiberNode.elementType &&
      (fiberNode.elementType.name || fiberNode.elementType.displayName);
    console.log('fibers', fiberNode, fiberNode.element);
    const isFunctionComponent =
      fiberNode && fiberNode.type && typeof fiberNode.type === 'function';

    if (isNamedComponent) {
      // Use the display name or name, whichever is available
      const name =
        fiberNode.elementType.displayName || fiberNode.elementType.name;
      components.push(name);
    } else if (isFunctionComponent) {
      const name = fiberNode.type.displayName || fiberNode.type.name;
      components.push(name);
    }

    if (fiberNode.child) {
      let childFiber = fiberNode.child;
      while (childFiber) {
        findComponentNames(childFiber);
        childFiber = childFiber.sibling;
      }
    }
  }

  // Find the internal React fiber node
  const key = Object.keys(element).find((key) =>
    key.startsWith('__reactFiber$')
  );
  const rootFiber = element[key];

  if (rootFiber) {
    findComponentNames(rootFiber);
  }

  return components;
}

const rootElement = document.getElementById('root');
const reactComponents = findReactComponents(rootElement);
console.log('root', rootElement);
console.log('reactcomp', reactComponents);

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

console.log('REACT DIVS', d3hierarchy);
console.log('POTENTIAL HIER', d3hierarchy2);

// Send the components data to the contentscript and frontend

// console.log('CHECK', d3hierarchy2);
window.postMessage({
  type: 'REACT_COMPONENTS',
  data: JSON.stringify(d3hierarchy2),
});

window.postMessage({
  type: 'ROOT_DIV',
  data: JSON.stringify(d3hierarchy),
});
