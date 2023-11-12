import { useState, useEffect } from 'react';
import { useUser } from '../../lib/auth';
import { fetchUser } from '../../lib/api';
import { User } from '../../types';
import { userRoles, permissions } from '../../types';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.role === userRoles.CORPORATE_ADMIN) {
      fetchUser(user.corporateId)
        .then((fetchedUsers) => {
          setUsers(fetchedUsers);
        })
        .catch((err) => {
          setError('Failed to fetch users.');
          console.error(err);
        });
    }
  }, [user]);

  if (!user || user.role !== userRoles.CORPORATE_ADMIN) {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div id="userListTable">
      <h1>User List</h1>
      {error && <p className="error">{error}</p>}
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
              <td>{userRoles[user.role]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;