import { Table } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GridTableHead } from '.';

export default {
  title: 'Components/Grid/GridTableHead',
  component: GridTableHead,
  argTypes: {
    orderBy: {
      control: 'text'
    },
  },
  decorators: [(Story) => <Table>{Story()}</Table>],
  parameters: {
    docs: {
      source: {
        code: `
          <GridTableHead
            onRequestSort={handleRequestSort}
            order={order}
            orderBy={orderBy}
            columns={columns}
            onAdd={onAddOrEditOrView}
          />
          `,
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof GridTableHead>;

const Template: ComponentStory<typeof GridTableHead> = (args) => (
  <GridTableHead {...args} />
);

export const Default = Template.bind({});

Default.args = {
  columns: [
    { id: 'firstName' as never, label: 'FirstName' },
    { id: 'lastName' as never, label: 'LastName' },
    { id: 'email' as never, label: 'Email' },
  ],
  order: 'asc',
  orderBy: 'firstName' as never
};

export const OrderDesc = Template.bind({});

OrderDesc.args = {
  columns: [
    { id: 'firstName' as never, label: 'FirstName' },
    { id: 'lastName' as never, label: 'LastName' },
    { id: 'email' as never, label: 'Email' },
  ],
  order: 'desc',
  orderBy: 'email' as never,
};
