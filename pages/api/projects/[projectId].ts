import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../lib/api';
import { db } from '../../../lib/db';
import { validateUser, permissions } from '../../../lib/auth';
import { Project } from '../../../types';

export default apiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { projectId },
    method,
  } = req;

  // Ensure the user has the right permissions
  const user = await validateUser(req);
  if (!user) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  switch (method) {
    case 'GET':
      // Retrieve a specific project by ID
      try {
        const project = await db.project.findUnique({
          where: { id: projectId as string },
        });
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        return res.status(200).json(project);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'PUT':
      // Update a specific project by ID
      if (!user.permissions.includes(permissions.EDIT_PROJECT)) {
        return res.status(403).json({ message: 'Not authorized to edit project' });
      }
      try {
        const project: Project = JSON.parse(req.body);
        const updatedProject = await db.project.update({
          where: { id: projectId as string },
          data: project,
        });
        return res.status(200).json(updatedProject);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'DELETE':
      // Delete a specific project by ID
      if (!user.permissions.includes(permissions.DELETE_PROJECT)) {
        return res.status(403).json({ message: 'Not authorized to delete project' });
      }
      try {
        await db.project.delete({
          where: { id: projectId as string },
        });
        return res.status(204).end();
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
});