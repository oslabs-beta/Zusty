import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TreeBtn from '../src/client/components/TreeBtn';
import useStore from '../src/client/store/store';
import { __esModule } from 'url-loader/dist';

describe('Testing TreeBtn', () => {
  it('renders a button with the text "Tree"', () => {
    render(<TreeBtn onClick={() => {}} className="" />);

    const button = screen.getByRole('button', { name: 'Tree' });
    expect(button).toHaveTextContent('Tree');
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<TreeBtn onClick={handleClick} className="" />);
    const button = screen.getByRole('button', { name: 'Tree' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets the activeTab to TreeBtn when clicked', () => {
    const setActiveTab = jest.fn();

    const handleClick = () => {
      setActiveTab('tree');
    };
    render(<TreeBtn onClick={handleClick} className="" />);

    const button = screen.getByRole('button', { name: 'Tree' });
    fireEvent.click(button);

    expect(setActiveTab).toHaveBeenCalledWith('tree');
  });
});

//act - more accurately implement react env for async functions
//maybe wrap around act
