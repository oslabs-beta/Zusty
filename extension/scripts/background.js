// declare a background port
let backgroundPort;

// backgroundjs finding a message frmo the content script type REACT COMPONENTS, then grab the request data
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'REACT_COMPONENTS' && backgroundPort) {
    console.log('Received in background script:', request);
    backgroundPort.onMessage({
      type: request.type,
      data: request.data,
    });
  }
});

//listens for messages from injected script and then sends messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.body === 'actionAndStateSnapshot' && backgroundPort) {
    backgroundPort.postMessage({
      body: request.body,
      action: request.action,
      actionCompleteTime: request.actionCompleteTime,
      prevState: request.prevState,
      nextState: request.nextState,
      store: request.store,
    });
  }
});

chrome.runtime.onConnect.addListener((port) => {
  backgroundPort = port;
  console.log(port, 'port');

  backgroundPort.onMessage.addListener((message, sender, sendResponse) => {
    if (message.body === 'runContent') {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['./scripts/contentScript.js'],
      });
    }
  });
});
