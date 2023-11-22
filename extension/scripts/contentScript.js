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

// fixed path from script to scripts
injectScript('./scripts/injectedScript.js', 'body');
