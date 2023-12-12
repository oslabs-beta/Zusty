import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoreBtn from '../src/client/components/StoreBtn';
import useStore from '../src/client/store/store';

describe('StoreBtn', () => {
  it('renders a button with the text Store', () => {
    render(<StoreBtn onClick={() => {}} className="" />);
    const button = screen.getByRole('button', { name: 'Store' });
    expect(button).toHaveTextContent('Store');
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<StoreBtn onClick={handleClick} className="" />);
    const button = screen.getByRole('button', { name: 'Store' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets the activeTab to TreeBtn when clicked', () => {
    const setActiveTab = jest.fn();

    const handleClick = () => {
      setActiveTab('storeBtn');
    };
    render(<StoreBtn onClick={handleClick} className="" />);

    const button = screen.getByRole('button', { name: 'Store' });
    fireEvent.click(button);

    expect(setActiveTab).toHaveBeenCalledWith('storeBtn');
  });
});
