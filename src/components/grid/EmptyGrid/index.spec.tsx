import { render, screen } from '@testing-library/react';

import { EmptyGrid } from '.';

describe('EmptyGrid', () => {
  it('should render EmptyGrid', () => {
    const message = 'No matching data';
    render(
      <table>
        <tbody>
          <EmptyGrid message={message} value='' />
        </tbody>
      </table>,
    );
    const tableCell = screen.getByText(message, {
      selector: 'td',
    });
    expect(tableCell).toBeInTheDocument();
  });
});
