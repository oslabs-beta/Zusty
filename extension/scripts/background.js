// declare a background port
let backgroundPort;

// getting message from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'REACT_COMPONENTS' && backgroundPort) {
    backgroundPort.postMessage({
      body: 'treeComponents',
      type: request.type,
      data: request.data,
    });
  }

  // getting message from zustymiddleware
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

// Chrome method to connect port (from App.jsx) to the port Chrome is running on
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
