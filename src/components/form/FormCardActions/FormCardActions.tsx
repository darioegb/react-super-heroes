import { useEffect, useState } from 'react';
import { CardActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';

interface FormCardActionsProps {
  view: boolean;
}

export const FormCardActions = ({ view }: FormCardActionsProps) => {
  const { t: translate } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [isviewOrEdit, setIsviewOrEdit] = useState(false);

  useEffect(() => {
    setIsviewOrEdit(!!id);
  }, [id]);

  const goBack = () => history.goBack();

  return (
    <CardActions>
      <Button variant='contained' color='secondary' onClick={goBack}>
        {translate('globals.buttons.cancel')}
      </Button>
      <Button
        variant='contained'
        color='inherit'
        type='reset'
        disabled={isviewOrEdit}
      >
        {translate('globals.buttons.reset')}
      </Button>
      <Button variant='contained' color='primary' type='submit' disabled={view}>
        {translate('globals.buttons.save')}
      </Button>
    </CardActions>
  );
};
