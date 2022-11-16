import { CardActions, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

interface FormCardActionsProps {
  /**
   * Flag to disabled reset button. Is true when card is on edit or view mode
   */
   isEditOrView: boolean;
  /**
   * Flag to disabled submit button. Is true if card is on view mode
   */
  view: boolean;
  /**
   * Optional cancel button text. By default is Cancel
   */
  cancelButtonText?: string;
  /**
   * Optional reset button text. By default is Reset
   */
  resetButtonText?: string;
  /**
   * Optional save button text. By default is Save
   */
  saveButtonText?: string;
}
/**
 * FormCardActions is a form card actions using mui that contain form actions buttons.
 */
export const FormCardActions = ({
  isEditOrView,
  view,
  cancelButtonText = 'Cancel',
  resetButtonText = 'Reset',
  saveButtonText = 'Save',
}: FormCardActionsProps) => {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <CardActions>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        onClick={goBack}
      >
        {cancelButtonText}
      </Button>
      <Button
        variant="contained"
        color="inherit"
        type="reset"
        disabled={isEditOrView}
      >
        {resetButtonText}
      </Button>
      <Button variant="contained" color="primary" type="submit" disabled={view}>
        {saveButtonText}
      </Button>
    </CardActions>
  );
};
