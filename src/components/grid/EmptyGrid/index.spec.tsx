import { render, screen } from '@testing-library/react';

import { EmptyGrid } from '.';

describe('EmptyGrid', () => {
  it('should render EmptyGrid', () => {
    render(
      <table>
        <tbody>
          <EmptyGrid value="" />
        </tbody>
      </table>,
    );
    const tableCell = screen.getByText('globals.grid.noMatchingDataText', { selector: 'td' });
    expect(tableCell).toBeInTheDocument();
  });
});
