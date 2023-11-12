import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { db } from './db';
import { validateUser, userRoles, permissions } from './auth';

export const apiHandler = (handler: any) => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Perform common checks or add headers here if needed
    res.setHeader('Content-Type', 'application/json');

    // Validate user roles and permissions before proceeding
    const user = await validateUser(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the user has the required role and permission to access the API
    const hasPermission = user.role === userRoles.SuperAdmin || user.permissions.includes(permissions.ManageProjects);
    if (!hasPermission) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Handle the API request
    await handler(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const setAuthCookies = (res: NextApiResponse, token: string, maxAge: number = 30 * 24 * 60 * 60) => {
  const cookie = serialize('auth', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
};

export const clearAuthCookies = (res: NextApiResponse) => {
  const cookie = serialize('auth', '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
};