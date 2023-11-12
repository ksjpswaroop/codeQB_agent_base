import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../lib/api';
import { db } from '../../../lib/db';
import { validateUser, userRoles, permissions } from '../../../lib/auth';
import { Project } from '@prisma/client';

export default apiHandler({
  get: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Authentication and authorization logic
      const user = await validateUser(req);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Check if the user has permission to view projects
      if (!user.roles.includes(userRoles.CorporateAdmin) && !user.roles.includes(userRoles.SuperAdmin)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Fetch projects based on user role
      let projects: Project[];
      if (user.roles.includes(userRoles.SuperAdmin)) {
        projects = await db.project.findMany();
      } else {
        projects = await db.project.findMany({
          where: {
            corporateId: user.corporateId,
          },
        });
      }

      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },
  post: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Authentication and authorization logic
      const user = await validateUser(req);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Check if the user has permission to create a project
      if (!user.roles.includes(userRoles.CorporateAdmin)) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      // Create a new project
      const project = await db.project.create({
        data: {
          ...req.body,
          corporateId: user.corporateId,
        },
      });

      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  },
});