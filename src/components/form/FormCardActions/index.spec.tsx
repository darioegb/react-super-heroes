import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { FormCardActions } from '.';

describe('FormCardActions', () => {
  it('should render FormCardActions', () => {
    render(<FormCardActions isEditOrView={false} view={false} />, { wrapper: MemoryRouter });
    expect(screen.getAllByRole('button').length).toBe(3);
  });

  it('should goback when click cancel button', () => {
    const history = createMemoryHistory();
    const spy = jest.spyOn(history, 'goBack');
    render(
      <Router history={history}>
        <FormCardActions isEditOrView={false} view={false} />
      </Router>,
    );
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(spy).toHaveBeenCalled();
  });
});
