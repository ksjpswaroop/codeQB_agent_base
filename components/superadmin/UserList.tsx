import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { User } from '../../types';
import { apiHandler } from '../../lib/api';
import { validateUser, userRoles, permissions } from '../../lib/auth';

const UserList: NextPage = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [session]);

  const fetchUsers = async () => {
    try {
      const response = await apiHandler(`/api/superadmin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (!validateUser(session, userRoles.SUPER_ADMIN, permissions.READ)) {
    return <div>You do not have permission to view this page.</div>;
  }

  return (
    <div id="userListTable">
      <h1>User List</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;