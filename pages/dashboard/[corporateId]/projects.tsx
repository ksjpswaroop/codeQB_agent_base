import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { ProjectList } from '../../../components/dashboard/ProjectList';
import { Layout } from '../../../components/Layout';
import { useUser, validateUser } from '../../../lib/auth';
import { fetchProjects } from '../../../lib/api';
import { Project, userRoles } from '../../../types';

const CorporateProjectsPage = () => {
  const router = useRouter();
  const { corporateId } = router.query;
  const [projects, setProjects] = useState<Project[]>([]);
  const user = useUser();

  useEffect(() => {
    if (user && validateUser(user, userRoles.CorporateAdmin)) {
      fetchProjects(corporateId as string)
        .then((data) => {
          setProjects(data);
        })
        .catch((error) => {
          console.error('Error fetching projects:', error);
        });
    } else {
      router.push('/api/auth/signin');
    }
  }, [corporateId, user, router]);

  return (
    <Layout>
      <div id="dashboardContainer">
        <h1>Projects</h1>
        <ProjectList projects={projects} />
      </div>
    </Layout>
  );
};

export default CorporateProjectsPage;

export const getServerSideProps = async (context) => {
  const { corporateId } = context.params;
  const projects = await fetchProjects(corporateId);

  return {
    props: {
      projects,
    },
  };
};