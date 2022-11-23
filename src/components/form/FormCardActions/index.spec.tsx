import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { mockUseNavigate } from 'setupTests';

import { FormCardActions } from '.';

describe('FormCardActions', () => {
  it('should render FormCardActions', () => {
    render(<FormCardActions isEditOrView={false} view={false} />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getAllByRole('button').length).toBe(3);
  });

  it('should goback when click cancel button', () => {
    render(
        <FormCardActions isEditOrView={false} view={false} />, {wrapper: BrowserRouter}
    );
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(mockUseNavigate).toHaveBeenCalled();
  });
});
