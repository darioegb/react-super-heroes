import { fireEvent, render, screen } from '@testing-library/react';

import { FilterGrid } from './FilterGrid';

describe('FilterGrid', () => {
  it('should render FilterGrid', () => {
    const handleChange = jest.fn();
    render(<FilterGrid handleChange={handleChange} />);
    const textField = screen.getByLabelText('globals.grid.filterInput.label') as HTMLInputElement;
    expect(textField).toBeInTheDocument();
  });
  it('should fire handleChange when change filterGrid input value', () => {
    const handleChange = jest.fn();
    render(<FilterGrid handleChange={handleChange} />);
    const textField = screen.getByLabelText('globals.grid.filterInput.label') as HTMLInputElement;
    fireEvent.change(textField, { target: { value: 'test' } });
    expect(textField.value).toBe('test');
  });
});
