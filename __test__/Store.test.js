import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import useStore from '../src/client/store/store';
import Store from '../src/client/components/Store';

describe('Store Component', () => {
  it('renders the store correctly', () => {
    render(<Store />);
    expect(screen.getByText('Store:')).toBeInTheDocument;
  });

  
});
