// content script listens for any message from injected script into DOM and sends to the background
window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
});

// listens to messages from background, send the message to the injectedScript
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.body === 'TimeTravel') {
    window.postMessage({
      body: 'TimeTravel',
      previousState: req.previousState,
    });
  }
});

// inject the injectedScript.js
const injectScript = (file, node) => {
  const body0 = document.getElementsByTagName(node)[0];
  const s0 = document.createElement('script');
  s0.setAttribute('type', 'text/javascript');
  s0.setAttribute('src', chrome.runtime.getURL(file));
  body0.appendChild(s0);
};

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
  return rootNode;
}
const d3hierarchy = hierarchyConv(rootElement);
const d3hierarchy2 = hierarchyConv(reactComponents);

console.log('REACT DIVS', d3hierarchy);
console.log('POTENTIAL HIER', d3hierarchy2);

// Send the components data to the extension
chrome.runtime.sendMessage({
  type: 'REACT_COMPONENTS',
  data: d3hierarchy2,
});

chrome.runtime
  .sendMessage({
    type: 'ROOT_DIV',
    data: d3hierarchy,
  })
  .catch((err) => console.log('error in sending ROOT_DIV', err));

//content scripts allow you to grab data from the current web page you are viewing
injectScript('./scripts/injectedScript.js', 'body');
