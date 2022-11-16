import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { convertEnumToKeyValueArray } from 'utils';
import { SelectController } from '.';

describe('SelectController', () => {
  enum TestEnum {
    Test1 = 1,
    Test2 = 2,
    Test3 = 3,
  }

  const SelectControllerHost = () => {
    const tests = convertEnumToKeyValueArray(TestEnum);
    const schema = yup
      .object({
        test: yup
          .mixed()
          .oneOf(Object.values(TestEnum), 'Error')
          .required('Error'),
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
        <SelectController
          name="test"
          control={control}
          defaultValue={undefined}
          defaultSelectLabel="None"
          label="Test"
          placeholder="Test"
          options={tests}
          error={errors?.test}
          disabled={false}
        />
        <button type="submit">SUBMIT</button>
      </form>
    );
  };

  it('should render SelectController', () => {
    render(<SelectControllerHost />);
    const select = screen.getByPlaceholderText('Test');
    expect(select).toBeInTheDocument();
  });

  it('should render SelectController with errors', async () => {
    render(<SelectControllerHost />);
    const submit = screen.getByText('SUBMIT');
    submit && fireEvent.click(submit);
    await screen.findByText('Error');
  });
});
