import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { FormCardActions } from '.';

export default {
  title: 'Components/Form/FormCardActions',
  component: FormCardActions,
  args: {
    cancelButtonText: 'Cancel',
    resetButtonText: 'Reset',
    saveButtonText: 'Save',
  },
  decorators: [(Story) => <MemoryRouter>{Story()}</MemoryRouter>],
  parameters: {
    actions: {
      handles: ['click button'],
    },
    docs: {
      source: {
        code: '<FormCardActions isEditOrView={isEditOrView} view={view} />',
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof FormCardActions>;

const Template: ComponentStory<typeof FormCardActions> = (args) => (
  <FormCardActions {...args} />
);

export const Default = Template.bind({});

Default.args = {
  isEditOrView: false,
  view: false,
};
