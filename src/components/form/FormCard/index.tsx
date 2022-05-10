import { Card, CardContent, CardHeader } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormCardActions } from 'components';

interface FormCardProps {
  children: JSX.Element;
  view: boolean;
}

export const FormCard = ({ children, view }: FormCardProps) => {
  const { t: translate } = useTranslation();

  return (
    <Card>
      <CardHeader title={translate('superHeroes.detail.title')} />
      <CardContent>{children}</CardContent>
      <FormCardActions view={view} />
    </Card>
  );
};
