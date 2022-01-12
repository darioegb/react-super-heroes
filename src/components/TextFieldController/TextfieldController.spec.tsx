import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextfieldController } from './TextfieldController';

describe('TextfieldController', () => {
  const TextfieldControllerHost = () => {
    const schema = yup
      .object({
        test: yup.string().required('Error'),
      })
      .required();
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
    });
    const onSubmit = jest.fn();

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextfieldController
          name="test"
          control={control}
          defaultValue={undefined}
          label="Test"
          error={errors?.test}
          disabled={false}
        />
        <button type="submit">SUBMIT</button>
      </form>
    );
  };

  it('should render TextfieldController', () => {
    const { container } = render(<TextfieldControllerHost />);
    const textfield = container.querySelector('input');
    expect(textfield).toBeInTheDocument();
  });

  it('should render TextfieldController with errors', async () => {
    render(<TextfieldControllerHost />);
    const submit = screen.getByText('SUBMIT');
    submit && fireEvent.click(submit);
    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
  });
});
