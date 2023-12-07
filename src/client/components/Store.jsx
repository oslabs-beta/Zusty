import React from 'react';
import useStore from '../store/store';
import uuid from 'react-uuid';

const Store = () => {
  const { store } = useStore();

  return (
    <div>
      {Object.keys(store).map((key) => (
        <p key={uuid()}>{`${key} : ${store[key]}`}</p>
      ))}
    </div>
  );
};

export default Store;
