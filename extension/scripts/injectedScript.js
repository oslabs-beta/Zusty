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
