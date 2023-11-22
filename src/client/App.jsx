import React, { useEffect } from 'react';
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
      port = chrome.runtime.connect('mlfjikfjladnjajemejbekfjgggjpmpe');
      connected = true;
    }

    if (connected) {
      console.log('Connected to chrome');
      // listens to the message from the background.js
      port.onMessage.addListener((message, sender, sendResponse) => {
        console.log('MESSAGE RECIVED');
        console.log({ message, sender, sendResponse });
        // JSON parse message.stateSnapsot
        console.log(JSON.parse(message.stateSnapshot));
        let currentStateSnapshot = JSON.parse(message.stateSnapshot);
        addStateSnapshot(currentStateSnapshot);
        // give it a time stamp of when we got the message and console log that
        // add an object to the global zustand state with two key/values - timestamp, stateSnapshot
      });
    }
  };

  useEffect(() => {
    console.log('Extension mounted');
    setUpExtensionListner();
  }, []);

  // to console log to test if the snapshot array in state is being updated
  useEffect(() => {
    console.log('State Snapshot Array Updated:', stateSnapshotArray);
  }, [stateSnapshotArray]);

  return (
    <div className='flex h-screen'>
      <div className='w-1/3 bg-blue-100'>
        <Navigation />
        <StateSnapshots />
      </div>
      <div className='w-2/3'>
        {activeTab === 'tree' && <D3Tree data={treeData} />}
        {activeTab === 'actionLog' && <ActionLog />}
        {activeTab === 'timeTravel' && <TimeTravel />}
        {activeTab === 'storeBtn' && <Store />}
      </div>
    </div>
  );
};

export default App;
