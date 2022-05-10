import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  onClose: (isOk: boolean) => void;
}

export const ConfirmDialog = ({ open, title, onClose }: ConfirmDialogProps) => {
  const { t: translate } = useTranslation();

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button autoFocus onClick={() => onClose(false)}>
          {translate('globals.buttons.cancel')}
        </Button>
        <Button onClick={() => onClose(true)}>
          {translate('globals.buttons.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
