import { NextPage } from 'next';
import { useSession, getSession } from 'next-auth/react';
import Layout from '../../components/Layout';
import UserList from './UserList';
import ProjectList from './ProjectList';
import SettingsForm from './SettingsForm';
import { validateUser, userRoles } from '../../lib/auth';
import { useEffect, useState } from 'react';
import { Corporate, Project, User } from '../../types';

const AdminDashboard: NextPage = () => {
  const { data: session } = useSession();
  const [corporate, setCorporate] = useState<Corporate | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (session) {
      // Fetch corporate data, projects, and users
      // This is a placeholder for actual API calls
      // Replace with your API fetching logic
      fetchCorporate(session.user.id).then(setCorporate);
      fetchProjects(session.user.id).then(setProjects);
      fetchUser(session.user.id).then(setUsers);
    }
  }, [session]);

  if (!session || !validateUser(session.user, userRoles.CorporateAdmin)) {
    return (
      <Layout>
        <h1>Access Denied</h1>
        <p>You do not have the necessary permissions to access this page.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div id="dashboardContainer">
        <h1>Corporate Admin Dashboard</h1>
        {corporate && <SettingsForm corporate={corporate} />}
        <UserList users={users} />
        <ProjectList projects={projects} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (!session || !validateUser(session.user, userRoles.CorporateAdmin)) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default AdminDashboard;

async function fetchCorporate(userId: string): Promise<Corporate> {
  // Replace with actual API call
  return Promise.resolve({ id: userId, name: 'Corporate Name', environment: 'Isolated Environment' });
}

async function fetchProjects(userId: string): Promise<Project[]> {
  // Replace with actual API call
  return Promise.resolve([]);
}

async function fetchUser(userId: string): Promise<User[]> {
  // Replace with actual API call
  return Promise.resolve([]);
}