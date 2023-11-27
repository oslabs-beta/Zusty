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
  const activeTab = useStore((state) => state.activeTab);
  const { stateSnapshotArray, addStateSnapshot } = useStore();
  const [d3data, setD3data] = useState(null);

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
        //current time in YYYY-MM-DDTHH:mm:ss format
        const timestamp = new Date().toISOString().slice(0, 19);
        // parsing the data we get back into JSON
        let currentStateSnapshot = JSON.parse(message.stateSnapshot);
        const currentStateWithTimestamp = {
          timestamp,
          stateSnapshot: currentStateSnapshot,
        };
        // add the current snapshot to the state snapshot array in the store
        addStateSnapshot(currentStateWithTimestamp);
        // give it a time stamp of when we got the message and console log that
        // add an object to the global zustand state with two key/values - timestamp, stateSnapshot
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
      sendResponse({ status: 'Received in frontend' });
      return true; // Indicates you wish to send a response asynchronously (if applicable)
    };
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  useEffect(() => {
    console.log('updateddata', d3data);
  }, [d3data]);
  console.log('test');
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
