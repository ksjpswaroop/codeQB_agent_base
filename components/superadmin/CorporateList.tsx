import { useState, useEffect } from 'react';
import { Corporate } from '../../types';
import { apiHandler } from '../../lib/api';
import { useUser } from '../../lib/auth';
import { FETCH_SUCCESS, FETCH_FAILURE } from '../../lib/utils';

const CorporateList = () => {
  const [corporates, setCorporates] = useState<Corporate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user && user.role === 'Super Admin') {
      fetchCorporates();
    }
  }, [user]);

  const fetchCorporates = async () => {
    setLoading(true);
    try {
      const response = await apiHandler('/api/corporate');
      if (response.status === 200) {
        setCorporates(response.data);
        setLoading(false);
        setError(null);
      } else {
        throw new Error(FETCH_FAILURE);
      }
    } catch (error) {
      setLoading(false);
      setError(FETCH_FAILURE);
    }
  };

  if (!user || user.role !== 'Super Admin') {
    return <p>Access denied. You must be a Super Admin to view this page.</p>;
  }

  return (
    <div>
      <h1>Corporate List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Domain</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {corporates.map((corporate) => (
              <tr key={corporate.id}>
                <td>{corporate.id}</td>
                <td>{corporate.name}</td>
                <td>{corporate.domain}</td>
                <td>
                  {/* Actions like edit/delete can be added here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CorporateList;