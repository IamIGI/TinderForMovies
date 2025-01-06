import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import ResetButton from '../../src/components/ResetButton/ResetButton';

// screen.debug();

describe('Reset button', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render button with svg image', () => {
    render(<ResetButton resetApp={() => {}} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });

  it('should call resetApp when button is clicked', () => {
    const mockResetApp = vi.fn();
    render(<ResetButton resetApp={mockResetApp} />);

    const button = screen.getByRole('button');

    button.click();
    expect(button).toBeInTheDocument();
    expect(mockResetApp).toHaveBeenCalledTimes(1);
  });
});
