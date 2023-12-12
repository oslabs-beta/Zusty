import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import useStore from '../src/client/store/store';
import ActionLog from '../src/client/components/ActionLog';
import { renderTimeCheck } from '../__test__/functionUtility';
import { handleToggleChange } from '../__test__/functionUtility';

describe('testing if ActionLog component renders correctly', () => {
  it('should correctly call the handleToggleChange function', () => {
    const ActionLog = ({ onChange }) => {
      return (
        <input type="checkbox" className="sr-only peer" onChange={onChange} />
      );
    };

    const setShowRenderTimes = jest.fn();
    //check the input if onChange is invoked it sets prev to be true
    const handleToggleChange = () => {
      setShowRenderTimes((prev) => !prev);
    };

    render(<ActionLog onChange={handleToggleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(setShowRenderTimes).toHaveBeenCalledWith(expect.any(Function));
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(setShowRenderTimes).toHaveBeenCalledTimes(3);
  });

  it('the input tag correctly starts with an empty string', () => {
    render(<ActionLog />);
    const input = screen.getByRole('checkbox');
    expect(input.value).toEqual('');
    expect(input.className).toEqual('sr-only peer');
  });

  it('should render the ActionLog heading', () => {
    render(<ActionLog />);
    expect(screen.getByText('Action Log')).toBeInTheDocument;
  });

  it('should render the State Before Action heading', () => {
    render(<ActionLog />);
    expect(screen.getByText('State Before Action:')).toBeInTheDocument;
  });

  it('should render the State After Action heading', () => {
    render(<ActionLog />);
    expect(screen.getByText('State After Action:')).toBeInTheDocument;
  });
});

describe('renderTimeCheck should return the correct class depending on input', () => {
  it('returns bg-red-500 if input is greater than 750ms', () => {
    const mockRenderTimeCheck = () => {
      return renderTimeCheck({ actionCompleteTime: 800 });
    };
    expect(mockRenderTimeCheck()).toEqual('bg-red-500');
  });

  it('returns bg-green-500 if input is less than 350ms', () => {
    const mockRenderTimeCheck = () => {
      return renderTimeCheck({ actionCompleteTime: 100 });
    };
    expect(mockRenderTimeCheck()).toEqual('bg-green-500');
  });

  it('returns bg-yellow-500 if input is between 350ms and 750ms', () => {
    const mockRenderTimeCheck = () => {
      return renderTimeCheck({ actionCompleteTime: 500 });
    };
    expect(mockRenderTimeCheck()).toEqual('bg-yellow-500');
  });
});
