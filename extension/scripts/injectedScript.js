// grab the users application store
const store = window.store;

console.log('injected script loaded');

// store.subscribe(console.log);
// subscribe to their store to get any changes that are made
store.subscribe(() => {
  const stateSnapshot = JSON.stringify(store.getState());
  // this goes to the background.js
  window.postMessage({ body: 'stateSnapshot', stateSnapshot });
});

function findReactComponents(element) {
  const components = [];

  function findComponents(el) {
    if (el.nodeType === Node.ELEMENT_NODE) {
      // Check if the element has a React component instance attached
      const key = Object.keys(el).find((key) =>
        key.startsWith('__reactFiber$')
      );
      const fiberNode = el[key];

      if (fiberNode) {
        const component = {
          name: fiberNode.type?.name || 'Unknown',
          props: fiberNode.memoizedProps,
          state: fiberNode.memoizedState,
          // Add more properties as needed
        };
        components.push(component);
      }

      // Recursively check child elements
      Array.from(el.children).forEach(findComponents);
    }
  }

  findComponents(element);
  return components;
}

const rootElement = document.getElementById('root'); // Or any other root element of the React app
const reactComponents = findReactComponents(rootElement);
console.log('ropt', rootElement);
console.log('reactcomp', reactComponents);

function hierarchyConv(state, maxDepth = 10) {
  const rootNode = {
    name: 'root',
    children: [],
  };

  // New set to keep track of visited nodes to handle circular references
  const visited = new WeakSet();

  function addNodeToTree(key, value, parent, depth) {
    // Check for maximum depth to avoid too deep recursion
    if (depth > maxDepth) {
      parent.children.push({
        name: key,
        attributes: { value: '[Max Depth Exceeded]' },
      });
      return;
    }

    // Check for circular references
    if (visited.has(value)) {
      parent.children.push({ name: key, attributes: { value: '[Circular]' } });
      return;
    }

    if (typeof value === 'object' && value !== null) {
      visited.add(value);
    }

    const newNode = {
      name: key,
      children: [],
    };

    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        addNodeToTree(`[${index}]`, item, newNode, depth + 1);
      });
    } else if (
      typeof value === 'object' &&
      value !== null &&
      Object.keys(value).length > 0
    ) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        addNodeToTree(subKey, subValue, newNode, depth + 1);
      });
    } else {
      newNode.attributes = { value: value };
    }

    parent.children.push(newNode);
  }

  // Start recursion with initial depth of 0
  addNodeToTree('state', state, rootNode, 0);
  console.log('Root Node:', rootNode);
  return rootNode.children[0];
}
const d3hierarchy = hierarchyConv(rootElement);
const d3hierarchy2 = hierarchyConv(reactComponents);

console.log('REACT DIVS', d3hierarchy);
console.log('POTENTIAL HIER', d3hierarchy2);

// Send the components data to the extension

// console.log('CHECK', d3hierarchy2);
window.postMessage({
  type: 'REACT_COMPONENTS',
  data: JSON.stringify(d3hierarchy2),
});

window.postMessage({
  type: 'ROOT_DIV',
  data: JSON.stringify(d3hierarchy),
});
