import { Table, TableBody } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { GridItem } from '.';

export default {
  title: 'Components/Grid/GridItem',
  component: GridItem,
  args: {
    confirmDialogConfig: {
      title: 'Are you sure',
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
        <GridItem
            row={item}
            columns={columns}
            onAddOrEditOrView={onAddOrEditOrView}
            onDelete={onDelete}
        />`,
        language: 'html',
      },
    },
  },
} as ComponentMeta<typeof GridItem>;

const Template: ComponentStory<typeof GridItem> = (args) => (
  <GridItem {...args} />
);

export const Default = Template.bind({});

Default.args = {
  row: { name: 'Test' },
  columns: [{ id: 'name' as never, label: 'Name' }],
};

export const RowImg = Template.bind({});
RowImg.args = {
  row: {
    picture: 'https://webkit.org/demos/srcset/image-src.png',
  },

  columns: [{ id: 'picture' as never, label: 'Picture', isImg: true }],
};

export const RowImgEmpty = Template.bind({});
RowImgEmpty.args = {
  row: {
    picture: null,
  },

  columns: [{ id: 'picture' as never, label: 'Picture', isImg: true }],
};

export const RowFormat = Template.bind({});
RowFormat.args = {
  row: { amount: 10 },
  columns: [
    {
      id: 'amount' as never,
      label: 'Amount',
      format: (value: number): string => `${value}$`,
    },
  ],
};
