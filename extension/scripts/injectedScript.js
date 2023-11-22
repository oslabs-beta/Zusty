// grab the users application storeconst store = window.store;
const store = window.store;

console.log('injected script loaded');

store.subscribe(() => {
  const stateSnapshot = JSON.stringify(store.getState());
  console.log(stateSnapshot);
  window.postMessage({ body: 'stateSnapshot', stateSnapshot });
});

// window.postMessage({
//   body: '',
//   state: JSON.stringify(store),
// });

// window.addEventListener('message', (event) => {
//   if (event.data.body === 'TimeTravel') {
//     const currState = event.data.TimeTravel;
//     store.setState(currState);
//   }
// });
