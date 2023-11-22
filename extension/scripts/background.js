// declare a background port
let backgroundPort;

//listens for messages from injected script and then sends messages to app.jsx
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.body === 'stateSnapshot' && backgroundPort) {
    console.log('Background message == stateSnapshot');
    // this sends the message to the app.jsx
    backgroundPort.postMessage({
      // body will be stateSnapshot
      body: request.body,
      // this will be the snapshot of the state
      stateSnapshot: request.stateSnapshot,
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

    if (message.body === 'TimeTravel') {
      chrome.tabs.sendMessage(tabs[0].id, {
        body: 'TimeTravel',
        previousState: message.previousState,
      });
    }
  });
});
