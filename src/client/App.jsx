import React, { useEffect } from 'react';
import uuid from 'react-uuid';
import useStore from './store/store';
import D3Tree from './components/D3Tree';
import Navigation from './components/NavBar';
import ActionLog from './components/ActionLog';
import TimeTravel from './components/TimeTravel';
import StateSnapshots from './components/StateSnapshots';
import Store from './components/Store';
import TreeRender from './components/d3TreeRender/TreeRender';

const App = () => {
  const activeTab = useStore((state) => state.activeTab);
  const { stateSnapshotArray, addStateSnapshot } = useStore();

  const treeData = {
    name: 'Board',
    children: [
      {
        name: 'Rows',
        children: [{ name: 'Box' }, { name: 'Box' }],
      },
      {
        name: 'Rows',
        children: [
          { name: 'Box' },
          {
            name: 'Box',
            children: [{ name: 'Box-Child' }, { name: 'Box-Child' }],
          },
        ],
      },
    ],
  };

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
        // parsing the data we get back into JSON
        let currentStateSnapshot = JSON.parse(message.stateSnapshot);
        // add the current snapshot to the state snapshot array in the store
        addStateSnapshot(currentStateSnapshot);
        // give it a time stamp of when we got the message and console log that
        // add an object to the global zustand state with two key/values - timestamp, stateSnapshot
      });
    }
  };

  // run the set up extension listner when the page loads
  useEffect(() => {
    setUpExtensionListner();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-blue-100">
        <Navigation />
        <StateSnapshots />
      </div>
      <div>
        <TreeRender />
      </div>
      <div className="w-2/3">
        {activeTab === 'tree' && <D3Tree data={treeData} />}
        {activeTab === 'actionLog' && <ActionLog />}
        {activeTab === 'timeTravel' && <TimeTravel />}
        {activeTab === 'storeBtn' && <Store />}
      </div>
    </div>
  );
};

export default App;
