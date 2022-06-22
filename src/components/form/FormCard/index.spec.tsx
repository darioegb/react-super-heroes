import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { FormCardActions } from 'components';
import { FormCard } from '.';

describe('FormCard', () => {
  const title = 'Test';
  const content = 'Card Content';

  it('should render FormCard with title and content', () => {
    const { container } = render(
      <FormCard
        children={<div>{content}</div>}
        actions={<FormCardActions view={false} />}
        title={title}
      />,
      { wrapper: MemoryRouter },
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});
