import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from '@mui/material';

import { ConfirmDialogConfig } from 'interfaces';

interface ConfirmDialogProps extends ConfirmDialogConfig {
  /**
   * Flag to open modal
   */
  open: boolean;
  /**
   * Optional body text
   */
  text?: string;
  /**
   * Fired when click cancel or confirm buttons
   */
  onClose: (isOk: boolean) => void;
}

/**
 * ConfirmDialog is a confirmation modal using mui.
 */
export const ConfirmDialog = ({
  open,
  title,
  text,
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Confirm',
  onClose,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      {text && (
        <DialogContent>
          <DialogContentText>{text}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button autoFocus onClick={() => onClose(false)}>
          {cancelButtonText}
        </Button>
        <Button onClick={() => onClose(true)} autoFocus>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
