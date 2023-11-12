import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { userRoles, permissions } from '../../types';
import { validateUser } from '../../lib/auth';
import Layout from '../../components/Layout';
import AdminDashboard from '../../components/dashboard/AdminDashboard';

const DashboardPage: NextPage = () => {
  return (
    <Layout>
      <AdminDashboard />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !validateUser(session.user, userRoles.CorporateAdmin, permissions.VIEW_DASHBOARD)) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  // Fetch additional data if needed and pass it to the page via props
  // Example: const dashboardData = await fetchDashboardData(session.user);

  return {
    props: {
      // dashboardData,
    },
  };
};

export default DashboardPage;