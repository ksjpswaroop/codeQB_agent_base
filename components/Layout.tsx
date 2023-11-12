import { ReactNode } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useUser } from '../lib/auth';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = 'Next.js App' }: Props) => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;