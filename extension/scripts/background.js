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
    console.log('actionAndStateSnapshot', { request });
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

    if (message.body === 'TimeTravel') {
      chrome.tabs.sendMessage(tabs[0].id, {
        body: 'TimeTravel',
        previousState: message.previousState,
      });
    }
  });
});
//declaring background port
//adding a listener to our port
//this listens for messages from app.jsx and has the ability to send messages to content script

//injects content script into current users tab

//sends a message to the previously injected script containing the previous state that the user's store should be udpated to

//messageing system for content scripts, dev tools, and injected script for d3 tree
