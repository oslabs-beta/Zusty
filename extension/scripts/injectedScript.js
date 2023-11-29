// grab the users application store
const store = window.store;

console.log('injected script loaded');

// store.subscribe(console.log);
// subscribe to their store to get any changes that are made
// if (store) {
//   store.subscribe(() => {
//     const stateSnapshot = JSON.stringify(store.getState());
//     // this goes to the background.js
//     window.postMessage({ body: 'stateSnapshot', stateSnapshot });
//   });
// }
