import { ComponentStory, ComponentMeta } from '@storybook/react';

import { EmptyGrid } from '.';

export default {
  title: 'Components/Grid/EmptyGrid',
  component: EmptyGrid,
  args: {
    message: 'No data matching the filter',
  },
} as ComponentMeta<typeof EmptyGrid>;

const Template: ComponentStory<typeof EmptyGrid> = (args) => (
  <EmptyGrid {...args} />
);

export const Default = Template.bind({});

Default.args = {
  value: '',
};
