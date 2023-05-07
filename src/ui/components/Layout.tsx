import { ReactNode } from 'react';
import Header from 'pages/header';
import Footer from 'pages/footer';
import CssBaseline from '@mui/material/CssBaseline';

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {

  return (
    <>
      <Header />
      <CssBaseline />
      {children}
      <Footer />
    </>
  )
};

export default Layout;