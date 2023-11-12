import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { CorporateList } from '../../components/superadmin/CorporateList';
import { Layout } from '../../components/Layout';
import { userRoles, permissions } from '../../types';
import { db } from '../../lib/db';
import { validateUser } from '../../lib/auth';

const SuperAdminCorporatesPage: NextPage = () => {
  const [corporates, setCorporates] = useState([]);

  useEffect(() => {
    const fetchCorporates = async () => {
      const response = await fetch('/api/corporate');
      const data = await response.json();
      if (response.ok) {
        setCorporates(data.corporates);
      } else {
        // Handle error
        console.error(data.error);
      }
    };

    fetchCorporates();
  }, []);

  return (
    <Layout>
      <h1>Corporates Management</h1>
      <CorporateList corporates={corporates} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !validateUser(session.user, userRoles.SUPER_ADMIN)) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {}, // You can pass some props to the page from here if needed
  };
};

export default SuperAdminCorporatesPage;