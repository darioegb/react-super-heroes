import { Table, TableBody } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GridItemList } from '.';
import { GridItem } from 'components';

export default {
  title: 'Components/Grid/GridItemList',
  component: GridItemList,
  argTypes: {
    orderBy: {
      options: ['firstName', 'lastName', 'email'],
      control: { type: 'select' },
    },
  },
  decorators: [
    (Story) => (
      <Table>
        <TableBody>{Story()}</TableBody>
      </Table>
    ),
  ],
  parameters: {
    docs: {
      source: {
        code: `
        <GridItemList
          rows={rows}
          order={order}
          orderBy={orderBy}
          renderItem={(item) => (
            // GridItem or custom item component
            <GridItem
              key={item.name}
              row={item}
              columns={columns}
              onView={onAddOrEditOrView}
              onEdit={onAddOrEditOrView}
              onDelete={onDelete}
            />
          )}
        />`,
      },
    },
  },
} as ComponentMeta<typeof GridItemList>;

const Template: ComponentStory<typeof GridItemList> = (args) => (
  <GridItemList
    {...args}
    renderItem={(item) => (
      <GridItem
        key={(item as { email: string }).email}
        row={item}
        columns={[
          { id: 'firstName' as never, label: 'FirstName' },
          { id: 'lastName' as never, label: 'LastName' },
          { id: 'email' as never, label: 'Email' },
        ]}
        confirmDialogConfig={{
          title: 'Test',
        }}
        onView={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    )}
  />
);

export const Default = Template.bind({});

Default.args = {
  rows: [
    { firstName: 'Test', lastName: 'User 1', email: 'test@test.com' },
    { firstName: 'Test2', lastName: 'User', email: 'testnew@test.com' },
    { firstName: 'Test3', lastName: 'User 3', email: 'other@test.com' },
  ],
  order: 'asc',
  orderBy: 'firstName' as never,
};
