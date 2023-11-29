// declare a background port
let backgroundPort;

// backgroundjs finding a message frmo the content script type REACT COMPONENTS, then grab the request data

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'ROOT_DIV' || request.type === 'REACT_COMPONENTS') {
    console.log('Received in background script:', request);

    // Forward the message to the front end
    chrome.runtime.sendMessage(request);
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

  backgroundPort.onMessage.addListener((message, sender, sendResponse) => {
    if (message.body === 'runContent') {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['./scripts/contentScript.js'],
      });
    }
  });
});
