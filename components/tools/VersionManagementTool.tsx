import { useState } from 'react';
import { manageVersions } from '../../lib/utils'; // Assuming manageVersions is a utility function

const VersionManagementTool = () => {
  const [versionInfo, setVersionInfo] = useState('');
  const [error, setError] = useState('');

  const handleVersionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVersionInfo(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const result = await manageVersions(versionInfo);
      setVersionInfo(result);
      setError('');
    } catch (e) {
      setError('Error managing versions');
    }
  };

  return (
    <div>
      <h1>Version Management Tool</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="versionInput">Enter Version Info:</label>
        <input
          type="text"
          id="versionInput"
          value={versionInfo}
          onChange={handleVersionChange}
        />
        <button type="submit">Manage Versions</button>
      </form>
      {error && <p className="error">{error}</p>}
      {versionInfo && <p className="success">Version Info: {versionInfo}</p>}
    </div>
  );
};

export default VersionManagementTool;