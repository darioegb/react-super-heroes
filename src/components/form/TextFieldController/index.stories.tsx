import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as yup from 'yup';

import { TextfieldController } from '.';

export default {
  title: 'Components/Form/TextfieldController',
  component: TextfieldController,
  args: {
    type: 'text',
    defaultValue: '',
    disabled: false,
    multiline: false,
    uppercase: false,
    rows: 0,
    characterLimit: 0,
    variant: 'standard',
  },
  argTypes: {
    control: {
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
        <TextfieldController
            name="firstName"
            control={control}
            defaultValue=""
            label="Test"
            error={errors?.firstName}
        />`,
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof TextfieldController>;

const Template: ComponentStory<typeof TextfieldController> = (args) => {
  const schema = useMemo(
    () =>
      yup.object().shape({
        [args.name]: yup.string().required(),
      }),
    [args.name],
  );
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <TextfieldController
      {...args}
      control={control}
      error={errors?.[args.name]}
    />
  );
};
export const Default = Template.bind({});

Default.args = {
  name: 'firstName',
  label: 'First Name',
  placeholder: 'Ex. test',
};

export const Multiline = Template.bind({});

Multiline.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'Ex. test',
  multiline: true,
  rows: 4,
};
