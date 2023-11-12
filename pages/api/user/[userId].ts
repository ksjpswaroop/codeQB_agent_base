import { NextApiRequest, NextApiResponse } from 'next';
import { apiHandler } from '../../../lib/api';
import { db } from '../../../lib/db';
import { validateUser, userRoles, permissions } from '../../../lib/auth';
import { User } from '../../../types';

export default apiHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (!userId || Array.isArray(userId)) {
    res.status(400).json({ error: 'Invalid user ID' });
    return;
  }

  switch (req.method) {
    case 'GET':
      await handleGet(req, res, userId);
      break;
    case 'PUT':
      await handlePut(req, res, userId);
      break;
    case 'DELETE':
      await handleDelete(req, res, userId);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

async function handleGet(req: NextApiRequest, res: NextApiResponse, userId: string) {
  // Validate the user making the request
  const user = await validateUser(req);
  if (!user || user.role !== userRoles.SuperAdmin) {
    res.status(403).json({ error: 'You do not have permission to view this user.' });
    return;
  }

  try {
    const userData = await db.user.findUnique({
      where: { id: userId },
    });

    if (!userData) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, userId: string) {
  // Validate the user making the request
  const user = await validateUser(req);
  if (!user || user.role !== userRoles.CorporateAdmin) {
    res.status(403).json({ error: 'You do not have permission to edit this user.' });
    return;
  }

  try {
    const userData: Partial<User> = req.body;
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: userData,
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, userId: string) {
  // Validate the user making the request
  const user = await validateUser(req);
  if (!user || user.role !== userRoles.SuperAdmin) {
    res.status(403).json({ error: 'You do not have permission to delete this user.' });
    return;
  }

  try {
    await db.user.delete({
      where: { id: userId },
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}