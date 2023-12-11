import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import useStore from '../src/client/store/store';
import ActionLog from '../src/client/components/ActionLog';

describe('testing if ActionLog component works correctly', () => {
  // it('should correctly call the handleToggleChange function', () => {
  //   const setShowRenderTimes = jest.fn();
  //   //check the input if onChange is invoked it sets prev to be true
  //   const handleToggleChange = () => {
  //     setShowRenderTimes((prev) => !prev);
  //   };
  //   console.log(handleToggleChange);
  //   render(<ActionLog onChange={handleToggleChange} />);

  //   const input = screen.getByRole('checkbox');
  //   fireEvent.change(input);
  //   expect(input.value).toEqual('');
  // });

  // test('setShowRenderTime correctly sets boolean to opposite', () => {
  //   expect(setShowRenderTimes(false)).toBe(true);
  // });

  // it('should correctly return specified class depending on the input', () => {
  //   const mockRenderTimeCheck = () => {
  //     renderTimeCheck(800);
  //   };
  //   render(<ActionLog />);
  //   expect(mockRenderTimeCheck).toEqual('bg-red-500');
  // });

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
