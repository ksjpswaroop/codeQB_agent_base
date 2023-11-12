import { useState, FormEvent } from 'react';
import { useUser } from '../../lib/auth';
import { generateSRS } from '../../lib/utils';
import { permissions } from '../../types';

const SrsGeneratorForm = () => {
  const [prompt, setPrompt] = useState('');
  const [srsDocument, setSrsDocument] = useState('');
  const { user, hasPermission } = useUser();

  const handleGenerateSrs = async (e: FormEvent) => {
    e.preventDefault();
    if (user && hasPermission(user, permissions.GENERATE_SRS)) {
      const generatedSrs = await generateSRS(prompt);
      setSrsDocument(generatedSrs);
    } else {
      alert('You do not have permission to generate SRS documents.');
    }
  };

  return (
    <div>
      <h1>SRS Document Generator</h1>
      <form onSubmit={handleGenerateSrs}>
        <textarea
          id="srsPrompt"
          name="srsPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={10}
        ></textarea>
        <button type="submit">Generate SRS</button>
      </form>
      {srsDocument && (
        <div>
          <h2>Generated SRS Document</h2>
          <pre>{srsDocument}</pre>
        </div>
      )}
    </div>
  );
};

export default SrsGeneratorForm;