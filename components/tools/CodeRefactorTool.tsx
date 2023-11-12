import { useState } from 'react';
import { useUser, permissions } from '../../lib/auth';
import { refactorCode } from '../../lib/utils';

const CodeRefactorTool = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [refactoredCode, setRefactoredCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useUser({
    redirectTo: '/login',
    redirectIfFound: false,
  });

  const canRefactorCode = user && permissions[user.role]?.includes('REFACTOR_CODE');

  const handleRefactor = async () => {
    if (!canRefactorCode) {
      setError('You do not have permission to refactor code.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await refactorCode(sourceCode, targetLanguage);
      setRefactoredCode(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {canRefactorCode ? (
        <div>
          <h1>Code Refactor Tool</h1>
          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            placeholder="Enter the source code here..."
          />
          <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            <option value="">Select Target Language</option>
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            {/* Add more languages as needed */}
          </select>
          <button onClick={handleRefactor} disabled={isLoading}>
            {isLoading ? 'Refactoring...' : 'Refactor Code'}
          </button>
          {error && <p className="error">{error}</p>}
          {refactoredCode && (
            <div>
              <h2>Refactored Code</h2>
              <pre>{refactoredCode}</pre>
            </div>
          )}
        </div>
      ) : (
        <p>You need to be logged in with the appropriate permissions to use this tool.</p>
      )}
    </div>
  );
};

export default CodeRefactorTool;