import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LOCALES } from 'constant';
import { AppProvider } from 'context';

import { Navbar } from '.';

export default {
  title: 'Components/Navbar',
  component: Navbar,
  argTypes: {
    locales: {
      control: false,
    },
    localesLabelPath: {
      control: false,
    },
  },
  args: {
    locales: LOCALES,
    localesLabelPath: 'globals.locales',
    showOnlineStatus: true,
  },
  decorators: [(Story) => <AppProvider>{Story()}</AppProvider>],
  parameters: {
    docs: {
      source: {
        code: `
        <Navbar
          title="Title"
          localesLabelPath="globals.locales"
          locales={LOCALES}
        />`,
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'CRUD with MUI',
};
