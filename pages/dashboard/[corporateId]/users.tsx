import { useRouter } from 'next/router';
import { NextPage, GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { userRoles, validateUser } from '../../../lib/auth';
import { db } from '../../../lib/db';
import { User } from '../../../types';
import Layout from '../../../components/Layout';
import UserList from '../../../components/dashboard/UserList';

interface DashboardUsersProps {
  users: User[];
}

const DashboardUsers: NextPage<DashboardUsersProps> = ({ users }) => {
  const router = useRouter();
  const { corporateId } = router.query;

  // You can add state and functions to handle user interactions if needed
  // const [localUsers, setLocalUsers] = useState<User[]>(users);

  return (
    <Layout>
      <div id="dashboardContainer">
        <h1>Users for Corporate ID: {corporateId}</h1>
        <UserList users={users} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req } = context;
  const corporateId = params?.corporateId;

  // Here you would validate the logged-in user and their permissions
  const user = await validateUser(req);
  if (!user || user.role !== userRoles.CorporateAdmin) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }

  // Fetch users associated with the corporateId
  const users = await db.user.findMany({
    where: {
      corporateId: corporateId as string,
    },
  });

  return {
    props: {
      users,
    },
  };
};

export default DashboardUsers;