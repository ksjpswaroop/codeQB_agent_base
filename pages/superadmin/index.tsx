import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import CorporateList from '../../components/superadmin/CorporateList';
import { userRoles, validateUser } from '../../lib/auth';
import { db } from '../../lib/db';

const SuperAdminPage: NextPage = () => {
  return (
    <Layout>
      <h1>Super Admin Dashboard</h1>
      <CorporateList />
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

  // Fetch data for super admin dashboard if needed
  // const corporates = await db.corporate.findMany();

  return {
    props: {
      // corporates,
    },
  };
};

export default SuperAdminPage;