// grab the users application storeconst store = window.store;
const store = window.store;

window.postMessage({
  body: "",
  state: JSON.stringify(store),
})

window.addEventListener("message", (event) => {
  if (event.data.body === "TimeTravel") {
    const currState = event.data.TimeTravel;
    store.setState(currState);
  }
})
