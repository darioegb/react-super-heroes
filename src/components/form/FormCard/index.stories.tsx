import { useMemo } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { FormCard } from '.';
import { FormCardActions, TextfieldController } from 'components';
import { DEFAULT_FORM_CONTROL_SIZES, REG_EXP } from 'utils/globals';

export default {
  title: 'Components/Form/FormCard',
  component: FormCard,
  argTypes: {
    children: {
      control: false,
    },
    actions: {
      control: false,
    },
  },
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>],
  parameters: {
    docs: {
      source: {
        code: `
        <FormCard
            title={title}
            actions={<FormCardActions view={view} />}
        >
        <!-- Content child -->
        </FormCard>`,
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof FormCard>;

const Template: ComponentStory<typeof FormCard> = (args) => {
  const { text } = DEFAULT_FORM_CONTROL_SIZES;
  const schema = useMemo(
    () =>
      yup.object().shape({
        firstName: yup
          .string()
          .matches(REG_EXP.alphabet)
          .min(text.min)
          .max(text.max)
          .required(),
      }),
    [text.max, text.min],
  );
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const onReset = () => reset();
  return (
    <form onSubmit={handleSubmit(() => {})} onReset={onReset}>
      <FormCard {...args}>
        <TextfieldController
          name="firstName"
          control={control}
          defaultValue={''}
          label="First Name"
          placeholder="Ex. test"
          variant="filled"
          error={errors?.firstName}
          disabled={false}
        />
      </FormCard>
    </form>
  );
};
export const Default = Template.bind({});

Default.args = {
  title: 'Test card',
  actions: <FormCardActions isEditOrView={false} view={false} />,
};
