import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { Button } from '@mui/material';

import { ConfirmDialog } from '.';

export default {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  argTypes: {
    open: {
      control: false,
    },
  },
  args: {
    cancelButtonText: 'Cancel',
    confirmButtonText: 'Confirm',
  },
  parameters: {
    docs: {
      source: {
        code: `
        <ConfirmDialog
            open={open}
            title="Test modal"
            onClose={handleClose}
        />`,
      },
    },
  },
} as ComponentMeta<typeof ConfirmDialog>;

const Template: ComponentStory<typeof ConfirmDialog> = (args) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const openModal = () => setOpen(true);

  return (
    <>
      <Button variant="contained" color="primary" onClick={openModal}>
        Launch
      </Button>
      <ConfirmDialog {...args} open={open} onClose={handleClose} />
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  title: 'Title',
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

Default.play = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);
  const launchButton = await canvas.getByText('Launch');
  await userEvent.click(launchButton);
};
