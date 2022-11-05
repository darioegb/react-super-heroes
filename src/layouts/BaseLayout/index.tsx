import { GlobalLoader, Navbar } from 'components';
import './index.scss';

interface BaseLayoutProps {
  children: JSX.Element | JSX.Element[];
}

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <GlobalLoader />
      <Navbar />
      <main className="body">{children}</main>
    </>
  );
};
