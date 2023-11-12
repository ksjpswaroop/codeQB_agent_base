import { useRouter } from 'next/router';
import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { db } from '../../lib/db';
import { validateUser, userRoles, permissions } from '../../lib/auth';
import AdminDashboard from '../../components/dashboard/AdminDashboard';
import { Corporate, User } from '../../types';

interface CorporateDashboardProps {
  corporate: Corporate;
  users: User[];
}

const CorporateDashboard: NextPage<CorporateDashboardProps> = ({ corporate, users }) => {
  const router = useRouter();
  const { corporateId } = router.query;

  return (
    <AdminDashboard>
      <h1>Corporate Dashboard - {corporate.name}</h1>
      <div id="dashboardContainer">
        {/* Render corporate-specific components here */}
      </div>
    </AdminDashboard>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const corporateId = context.params?.corporateId;

  if (!session || !validateUser(session.user, userRoles.CorporateAdmin, permissions.VIEW_DASHBOARD)) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const corporate = await db.corporate.findUnique({
    where: { id: corporateId },
  });

  if (!corporate) {
    return {
      notFound: true,
    };
  }

  const users = await db.user.findMany({
    where: { corporateId: corporate.id },
  });

  return {
    props: {
      corporate,
      users,
    },
  };
};

export default CorporateDashboard;