import React, { useEffect } from 'react';
import useStore from './store/store';
import Navigation from './components/NavBar';
import ActionLog from './components/ActionLog';
import StateSnapshots from './components/StateSnapshots';
import Store from './components/Store';
import ReactD3Tree from './d3hierarchy/ReactD3Tree';

const App = () => {
  const activeTab = useStore((state) => state.activeTab);
  const { addStateSnapshot, addDiffSnapshot, setStore, setD3data } = useStore();

  let connected = false;
  let port;
  let count = 0;

  // listening to messages from background.js
  const setUpExtensionListener = () => {
    if (!connected) {
      port = chrome.runtime.connect();
      connected = true;
    }

    if (connected) {
      port.onMessage.addListener((message, sender, sendResponse) => {
        if (message.body === 'actionAndStateSnapshot') {
          const store = JSON.parse(message.store);
          setStore(store);

          const timestamp = new Date().toLocaleString();
          let currentStateSnapshot = JSON.parse(message.nextState);
          const currentStateWithTimestamp = {
            timestamp,
            stateSnapshot: currentStateSnapshot,
          };
          addStateSnapshot(currentStateWithTimestamp);

          let prevState = JSON.parse(message.prevState);
          let nextState = JSON.parse(message.nextState);
          const currentDiffWithTimestamp = {
            action: message.action,
            actionCompleteTime: message.actionCompleteTime,
            prevState,
            nextState,
          };

          addDiffSnapshot(currentDiffWithTimestamp);
        }

        if (message.body === 'treeComponents' && count < 1) {
          let data = JSON.parse(message.data);
          setD3data(data);
          count++;
        }
      });
    }
  };

  // run the set up extension listner when the page loads
  useEffect(() => {
    setUpExtensionListener();
  }, []);

  return (
    <div className='flex h-screen'>
      <div className='w-1/3 bg-code-bg border-r-2 border-lt-grey'>
        <Navigation />
        <StateSnapshots />
      </div>
      <div className='w-2/3 bg-code-bg'>
        {activeTab === 'tree' && <ReactD3Tree />}
        {activeTab === 'actionLog' && <ActionLog />}
        {activeTab === 'timeTravel' && <TimeTravel />}
        {activeTab === 'storeBtn' && <Store />}
      </div>
    </div>
  );
};

export default App;
