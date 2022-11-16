import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FilterGrid } from '.';

export default {
  title: 'Components/Grid/FilterGrid',
  component: FilterGrid,
  parameters: {
    docs: {
      source: {
        code: '<FilterGrid handleChange={handleChange} />',
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof FilterGrid>;

const Template: ComponentStory<typeof FilterGrid> = (args) => (
  <FilterGrid {...args} />
);

export const Default = Template.bind({});

Default.args = {
    label: 'Search',
    placeholder: 'ex. test',
  };