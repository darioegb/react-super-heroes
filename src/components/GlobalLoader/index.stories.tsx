import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GlobalLoader } from '.';

export default {
  title: 'Components/GlobalLoader',
  component: GlobalLoader,
  parameters: {
    docs: {
      source: {
        code: '<GlobalLoader loading={loading} />'
      },
    },
  },
} as ComponentMeta<typeof GlobalLoader>;

const Template: ComponentStory<typeof GlobalLoader> = (args) => (
  <GlobalLoader {...args} />
);

export const Default = Template.bind({});

Default.args = {
  loading: true,
};
