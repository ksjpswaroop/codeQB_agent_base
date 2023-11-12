import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler, db, validateUser } from '../../../lib';
import { permissions, userRoles } from '../../../types';

export default apiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { corporateId },
    method,
  } = req;

  // Ensure the user has the right to access corporate data
  const user = await validateUser(req);
  if (!user || user.role !== userRoles.CorporateAdmin || user.corporateId !== corporateId) {
    return res.status(403).json({ message: 'You do not have permission to view this data.' });
  }

  switch (method) {
    case 'GET':
      try {
        const corporate = await db.corporate.findUnique({
          where: { id: corporateId as string },
        });
        if (!corporate) {
          return res.status(404).json({ message: 'Corporate not found.' });
        }
        res.status(200).json(corporate);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
      }
      break;

    case 'PUT':
      try {
        if (!permissions.includes('corporate_edit')) {
          return res.status(403).json({ message: 'You do not have permission to edit this data.' });
        }
        const corporate = await db.corporate.update({
          where: { id: corporateId as string },
          data: req.body,
        });
        res.status(200).json(corporate);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
      }
      break;

    case 'DELETE':
      try {
        if (!permissions.includes('corporate_delete')) {
          return res.status(403).json({ message: 'You do not have permission to delete this data.' });
        }
        await db.corporate.delete({
          where: { id: corporateId as string },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Internal server error.' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});