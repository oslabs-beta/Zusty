// declare a background port
let backgroundPort;

// backgroundjs finding a message frmo the content script type REACT COMPONENTS, then grab the request data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'REACT_COMPONENTS' && backgroundPort) {
    console.log('Received in background script:', request);
    backgroundPort.postMessage({
      type: request.type,
      data: request.data,
    });
  }
});

//listens for messages from injected script and then sends messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.body === 'actionAndStateSnapshot' && backgroundPort) {
    backgroundPort.postMessage({
      // body will be actionLog
      body: request.body,
      // this will be the action
      action: request.action,
      prevState: request.prevState,
      nextState: request.nextState,
    });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  backgroundPort = port;
  console.log(port, "port")

  backgroundPort.onMessage.addListener((message, sender, sendResponse) => {
    if (message.body === 'runContent') {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['./scripts/contentScript.js'],
      });
    }
  });
});
