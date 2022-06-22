import { Card, CardContent, CardHeader } from '@mui/material';

interface FormCardProps {
  children: JSX.Element;
  actions: JSX.Element;
  title: string;
}

export const FormCard = ({ children, title, actions }: FormCardProps) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      {actions}
    </Card>
  );
};
