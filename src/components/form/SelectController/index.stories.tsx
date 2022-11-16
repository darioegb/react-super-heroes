import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';

import { SelectController } from '.';

export default {
  title: 'Components/Form/SelectController',
  component: SelectController,
  argTypes: {
    control: {
      control: false,
    },
    optionLabels: {
      control: false,
    },
    error: {
      control: false,
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
        <SelectController
            name="vehicle"
            control={control}
            defaultValue=""
            defaultSelectLabel="Select an item"
            label="Test"
            options={options}
            error={errors?.vehicle}
        />`,
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof SelectController>;

const Template: ComponentStory<typeof SelectController> = (args) => {
  const schema = useMemo(
    () =>
      yup.object().shape({
        vehicle: yup.mixed().required(),
      }),
    [],
  );
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <SelectController {...args} control={control} error={errors?.vehicle} />
  );
};
export const Default = Template.bind({});

Default.args = {
  name: 'vehicle',
  defaultSelectLabel: 'Select an item',
  disabled: false,
  label: 'Vehicle',
  options: [
    {
      key: 'car',
      value: '1',
    },
    {
      key: 'motorcycle',
      value: '2',
    },
    {
      key: 'pickup',
      value: '3',
    },
    {
      key: 'truck',
      value: '4',
    },
  ],
};
