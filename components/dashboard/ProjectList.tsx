import { useState, useEffect } from 'react';
import { Project } from '../../types';
import { fetchProjects } from '../../lib/api';
import { useUser } from '../../lib/auth';
import { permissions } from '../../types';

const ProjectList = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();

  useEffect(() => {
    if (user && user.role === permissions.CorporateAdmin) {
      fetchProjects(user.corporateId)
        .then((data) => {
          setProjects(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch projects');
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="projectListTable">
      <h2>Projects</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.name}</td>
              <td>{project.status}</td>
              <td>
                {/* Actions like edit/delete can be added here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;