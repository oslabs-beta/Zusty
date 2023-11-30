import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useStore from './store/store';
import D3Tree from './components/D3Tree';
import Navigation from './components/NavBar';
import ActionLog from './components/ActionLog';
import TimeTravel from './components/TimeTravel';
import StateSnapshots from './components/StateSnapshots';
import Store from './components/Store';
import ReactD3Tree from './d3hierarchy/ReactD3Tree';

const App = () => {
  const [d3data, setD3data] = useState(null);
  const activeTab = useStore((state) => state.activeTab);
  const { addStateSnapshot, addActionSnapshot, addDiffSnapshot } = useStore();

  let connected = false;
  let port;

  // getting state snapshots from injected script
  const setUpExtensionListner = () => {
    if (!connected) {

      port = chrome.runtime.connect();
      connected = true;
    }

    if (connected) {
      // listens to the message from the background.js
      port.onMessage.addListener((message, sender, sendResponse) => {
 

        if (message.body === 'actionAndStateSnapshot') {
          console.log(message);
          const actionSnapshot = message.action;
          addActionSnapshot(actionSnapshot);

          const timestamp = new Date().toISOString().slice(0, 19);
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
            prevState,
            nextState,
          };

          addDiffSnapshot(currentDiffWithTimestamp);
        }
      });
    }
  };

  // run the set up extension listner when the page loads
  useEffect(() => {
    setUpExtensionListner();
  }, []);

  const listener = () => {
    if (!connected) {
      console.log('connecting to port');
      port = chrome.runtime.connect();
      connected = true;
    }
    if (connected) {
      port.onMessage.addListener((message, sender, sendResponse) => {
        console.log('d3data', message);
        let data = JSON.parse(message.data);
        console.log('d3', data);
        useStore.getState().setD3data(data);
      });
    }
  };

  useEffect(() => {
    listener();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-dk-navy border-r-2 border-lt-grey">
        <Navigation />
        <StateSnapshots />
      </div>
      {/* <TreeRender /> */}
      <div className="w-2/3 bg-dk-navy">
        {activeTab === 'tree' && <ReactD3Tree data={d3data} />}
        {activeTab === 'actionLog' && <ActionLog />}
        {activeTab === 'timeTravel' && <TimeTravel />}
        {activeTab === 'storeBtn' && <Store />}
      </div>
    </div>
  );
};

export default App;
