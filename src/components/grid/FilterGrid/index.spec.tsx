import { fireEvent, render, screen } from '@testing-library/react';

import { FilterGrid } from '.';

describe('FilterGrid', () => {
  const handleChange = jest.fn();
  const initRender = () => render(<FilterGrid handleChange={handleChange} />);
  it('should render FilterGrid', () => {
    initRender();
    const textfield = screen.getByLabelText(
      'globals.grid.filterInput.label',
    ) as HTMLInputElement;
    expect(textfield).toBeInTheDocument();
  });
  it('should fire handleChange when change filterGrid input value', () => {
    initRender();
    const textfield = screen.getByLabelText(
      'globals.grid.filterInput.label',
    ) as HTMLInputElement;
    fireEvent.change(textfield, { target: { value: 'test' } });
    expect(textfield.value).toBe('test');
  });
});
