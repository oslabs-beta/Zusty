// grab the users application store
const store = window.store;

const findReactComponents = (element) => {
  const components = [];

  const findComponentNames = (fiberNode) => {
    // Check if the node is a React component and has a name, excluding 'div' and 'h1'
    const isComponent =
      fiberNode && fiberNode.elementType && fiberNode.elementType.name;
    const isNotHtmlElement =
      fiberNode && fiberNode.type && typeof fiberNode.type === 'function';

    if (isComponent || isNotHtmlElement) {
      // Only push component names that are not 'div' or 'h1'
      const name = fiberNode.elementType.name || fiberNode.type.name;
      components.push(name);
    }

    if (fiberNode && fiberNode.stateNode) {
      let childFiber = fiberNode.child;
      while (childFiber) {
        findComponentNames(childFiber);
        childFiber = childFiber.sibling;
      }
    }
  };

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
};

const rootElement = document.getElementById('root');
const reactComponents = findReactComponents(rootElement);

const hierarchyConv = (state) => {
  const rootNode = {
    name: 'STATE',
    children: [],
  };

  const addNodeToTree = (key, value, parent) => {
    // Check if the value is an object and not null
    if (typeof value === 'object' && value !== null) {
      // Create a new node for the object
      const newNode = { name: key, children: [] };
      // recurse add children for each entry in the object

      // If the new node has no children, don't add an empty children array
      if (newNode.children.length > 0) {
        parent.children.push(newNode);
      } else {
        // If an object is empty, represent it as a node with its name
        parent.children.push({ name: key });
      }
    } else {
      // If the value is not an object, represent it as a node with the value as its name
      parent.children.push({ name: `${String(value)}` });
    }
  };

  // Initialize the tree construction
  Object.entries(state).forEach(([key, value]) => {
    addNodeToTree(key, value, rootNode);
  });

  return rootNode;
};

const d3hierarchy2 = hierarchyConv(reactComponents);

setInterval(() => {
  window.postMessage({
    type: 'REACT_COMPONENTS',
    data: JSON.stringify(d3hierarchy2),
  });
}, 1000);
