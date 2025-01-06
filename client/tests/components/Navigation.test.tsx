import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Navigation from '../../src/components/Menu/Navigation/Navigation';

describe('Navigation', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const mockToggleMenuVisibility = vi.fn();

  it('should render Navigation ', () => {
    render(<Navigation toggleMenuVisibility={mockToggleMenuVisibility} />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toEqual(3);
  });

  it('should toggle menu visibility', () => {
    render(<Navigation toggleMenuVisibility={mockToggleMenuVisibility} />);

    const button = screen.getByTestId('toggle-menu');

    button.click();
    expect(mockToggleMenuVisibility).toHaveBeenCalledTimes(1);
  });
});
