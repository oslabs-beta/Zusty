window.addEventListener('message', (event) => {
  chrome.runtime.sendMessage(event.data);
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
