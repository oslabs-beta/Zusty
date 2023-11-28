import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import useStore from './store/store';
import D3Tree from './components/D3Tree';
import Navigation from './components/NavBar';
import ActionLog from './components/ActionLog';
import TimeTravel from './components/TimeTravel';
import StateSnapshots from './components/StateSnapshots';
import Store from './components/Store';

const App = () => {
  const [d3data, setD3data] = useState(null);
  const activeTab = useStore((state) => state.activeTab);
  const { stateSnapshotArray, addStateSnapshot, addActionSnapshot } =
    useStore();

  let connected = false;
  let port;

  // getting state snapshots from injected script
  const setUpExtensionListner = () => {
    if (!connected) {
      console.log('Connecting to chrome...');
      // connect to chrome runtime
      port = chrome.runtime.connect();
      connected = true;
    }

    if (connected) {
      // listens to the message from the background.js
      port.onMessage.addListener((message, sender, sendResponse) => {
        console.log('prev state', message.prevState);
        console.log('next state', message.nextState);
        console.log('action', message.action);

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
        }
      });
    }
  };

  // run the set up extension listner when the page loads
  useEffect(() => {
    setUpExtensionListner();
  }, []);

  useEffect(() => {
    const messageListener = (message, sender, sendResponse) => {
      if (message.type === 'ROOT_DIV' || message.type === 'REACT_COMPONENTS') {
        console.log('frontend', message.data);
        setD3data(message.data);
        console.log('checking', d3data);
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);
  }, [d3data]);

  useEffect(() => {
    console.log('updateddata', d3data);
  }, [d3data]);
  console.log('ok', d3data);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-blue-100">
        <Navigation />
        <StateSnapshots />
      </div>
      {/* <TreeRender /> */}
      <div className="w-2/3">
        {activeTab === 'tree' && <D3Tree data={d3data} />}
        {activeTab === 'actionLog' && <ActionLog />}
        {activeTab === 'timeTravel' && <TimeTravel />}
        {activeTab === 'storeBtn' && <Store />}
      </div>
    </div>
  );
};

export default App;
