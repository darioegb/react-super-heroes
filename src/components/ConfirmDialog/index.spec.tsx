import { fireEvent, render, screen } from '@testing-library/react';

import { ConfirmDialog } from '.';

describe('ConfirmDialog', () => {
  const onClose = jest.fn();

  const initRender = (title = '') =>
    render(
      <table>
        <tbody>
          <ConfirmDialog open={true} title={title} onClose={onClose} />
        </tbody>
      </table>,
    );
  it('should render ConfirmDialog', () => {
    const text = 'Test';
    initRender(text);
    const dialogTitle = screen.getByText(text);
    expect(dialogTitle).toBeInTheDocument();
  });
  it('should close ConfirmDialog when click on cancel button', () => {
    const text = 'Test';
    initRender(text);
    const cancelButton = screen.getAllByRole('button')[0];
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it('should close ConfirmDialog when click on confirm button', () => {
    const text = 'Test';
    initRender(text);
    const confirmButton = screen.getAllByRole('button')[1];
    fireEvent.click(confirmButton);
    expect(onClose).toHaveBeenCalledWith(true);
  });
});
