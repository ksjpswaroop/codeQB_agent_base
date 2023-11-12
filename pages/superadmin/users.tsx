import { NextPage, GetServerSideProps } from 'next';
import { useSession, getSession } from 'next-auth/react';
import { userRoles, permissions } from '../../types';
import { validateUser } from '../../lib/auth';
import { fetchUsers } from '../../lib/api';
import UserList from '../../components/superadmin/UserList';
import Layout from '../../components/Layout';

const SuperAdminUsersPage: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <p>Access Denied</p>;
  }

  return (
    <Layout>
      <h1>Super Admin - User Management</h1>
      <UserList />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || !validateUser(session.user, userRoles.SUPER_ADMIN, permissions.VIEW_USERS)) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  const users = await fetchUsers();

  return {
    props: { users },
  };
};

export default SuperAdminUsersPage;