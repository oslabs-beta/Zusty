// content script listens for any message from injected script into DOM and sends to the background
window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
});

// listens to messages from background, send the message to the injectedScript
// chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
//   if (req.body === 'TimeTravel') {
//     window.postMessage({
//       body: 'TimeTravel',
//       previousState: req.previousState,
//     });
//   }
// });

window.addEventListener('message', (event) => {
  if (event.source === window && event.data.type === 'REACT_COMPONENT') {
    chrome.runtime.sendMessage(event.data);
    console.log('listening for d3data', event.data);
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

//content scripts allow you to grab data from the current web page you are viewing
injectScript('./scripts/injectedScript.js', 'body');
