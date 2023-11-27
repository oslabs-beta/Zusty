import React, { useEffect } from 'react';
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
  const { stateSnapshotArray, addStateSnapshot, addActionSnapshot } =
    useStore();

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
