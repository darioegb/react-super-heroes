import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TextfieldController } from '.';

describe('TextfieldController', () => {
  const TextfieldControllerHost = () => {
    const schema = yup.object().shape({
      test: yup.string().required('Error'),
      test2: yup.string().required('Error'),
    });
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
          uppercase={true}
        />
        <TextfieldController
          name="test2"
          control={control}
          defaultValue={undefined}
          label="Test2"
          error={errors?.test}
          disabled={false}
          characterLimit={20}
        />
        <button type="submit">SUBMIT</button>
      </form>
    );
  };

  const setup = () => {
    render(<TextfieldControllerHost />);
    const textfield = screen.getByLabelText('Test') as HTMLInputElement;
    const textfield2 = screen.getByLabelText('Test2') as HTMLInputElement;
    const submit = screen.getByText('SUBMIT');
    return {
      textfield,
      textfield2,
      submit,
    };
  };

  it('should render TextfieldController', () => {
    const { textfield } = setup();
    expect(textfield).toBeInTheDocument();
  });

  it('should uppercase on change TextfieldController', () => {
    const { textfield } = setup();
    fireEvent.change(textfield, { target: { value: 'test' } });
    expect(textfield.value).toBe('TEST');
  });

  it('should display characterLimit on change TextfieldController', () => {
    const { textfield2 } = setup();
    fireEvent.change(textfield2, { target: { value: 'test' } });
    expect(textfield2.value).toBe('test');
    expect(screen.getByText('4/20')).toBeInTheDocument();
  });

  it('should render TextfieldController with errors', async () => {
    const { submit } = setup();
    fireEvent.click(submit);
    expect((await screen.findAllByText('Error'))[0]).toBeInTheDocument();
  });
});
