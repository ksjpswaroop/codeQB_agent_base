import { useState, FormEvent } from 'react';
import { generateDocs } from '../../lib/utils'; // Assuming generateDocs is a utility function for doc generation

const RepositoryDocsForm = () => {
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [documentation, setDocumentation] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateDocs = async (event: FormEvent) => {
    event.preventDefault();
    setIsGenerating(true);
    setError('');

    try {
      const docs = await generateDocs(repositoryUrl);
      setDocumentation(docs);
    } catch (err) {
      setError('Failed to generate documentation. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <h1>Repository Documentation Generator</h1>
      <form onSubmit={handleGenerateDocs}>
        <label htmlFor="repositoryUrl">Repository URL:</label>
        <input
          type="url"
          id="repositoryUrl"
          name="repositoryUrl"
          value={repositoryUrl}
          onChange={(e) => setRepositoryUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Documentation'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {documentation && (
        <div>
          <h2>Generated Documentation:</h2>
          <pre>{documentation}</pre>
        </div>
      )}
    </div>
  );
};

export default RepositoryDocsForm;