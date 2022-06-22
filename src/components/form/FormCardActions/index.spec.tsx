import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { FormCardActions } from '.';

describe('FormCardActions', () => {
  it('should render FormCardActions', () => {
    render(<FormCardActions view={false} />, { wrapper: MemoryRouter });
    expect(screen.getAllByRole('button').length).toBe(3);
  });

  it('should goback when click cancel button', () => {
    const history = createMemoryHistory();
    const spy = jest.spyOn(history, 'goBack');
    render(
      <Router history={history}>
        <FormCardActions view={false} />
      </Router>,
    );
    const cancelButton = screen.getByText('globals.buttons.cancel');
    fireEvent.click(cancelButton);
    expect(spy).toHaveBeenCalled();
  });
});
