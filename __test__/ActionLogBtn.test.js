import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';
import ActionLogBtn from '../src/client/components/ActionLogBtn';

describe('ActionLogBtn', () => {
  it('should redner a button with the text Action Log', () => {
    render(<ActionLogBtn onClick={() => {}} className="" />);

    const button = screen.getByRole('button', { name: 'Action Log' });
    expect(button).toHaveTextContent('Action Log');
  });

  it('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(<ActionLogBtn onClick={handleClick} className="" />);
    const button = screen.getByRole('button', { name: 'Action Log' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('sets the activeTab to TreeBtn when clicked', () => {
    const setActiveTab = jest.fn();

    const handleClick = () => {
      setActiveTab('actionLog');
    };
    render(<ActionLogBtn onClick={handleClick} className="" />);

    const button = screen.getByRole('button', { name: 'Action Log' });
    fireEvent.click(button);

    expect(setActiveTab).toHaveBeenCalledWith('actionLog');
  });
});
