import { Card, CardContent, CardHeader } from '@mui/material';

interface FormCardProps {
  /**
   * Children contain form content
   */
  children: JSX.Element;
  /**
   * FormActions component
   */
  actions: JSX.Element;
  /**
   * Form card title
   */
  title: string;
}

/**
 * FormCard is a form card container using mui.
 */
export const FormCard = ({ children, title, actions }: FormCardProps) => {
  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
      {actions}
    </Card>
  );
};
