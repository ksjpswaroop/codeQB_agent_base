import { useState, FormEvent } from 'react';
import { generateApp } from '../../lib/utils'; // Assuming generateApp is a utility function for app generation

const AppGeneratorForm = () => {
  const [prompt, setPrompt] = useState('');
  const [srsDocument, setSrsDocument] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(event.target.value);
  };

  const handleSrsDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSrsDocument(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsGenerating(true);

    try {
      const code = await generateApp(prompt, srsDocument);
      setGeneratedCode(code);
    } catch (error) {
      console.error('Error generating app:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <h2>App Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="prompt">Enter Prompt:</label>
          <textarea
            id="prompt"
            name="prompt"
            value={prompt}
            onChange={handlePromptChange}
            placeholder="Describe the app you want to generate..."
          />
        </div>
        <div>
          <label htmlFor="srsDocument">Or upload SRS Document:</label>
          <input
            type="file"
            id="srsDocument"
            name="srsDocument"
            onChange={handleSrsDocumentChange}
            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>
        <button type="submit" disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate App'}
        </button>
      </form>
      {generatedCode && (
        <div>
          <h3>Generated Code:</h3>
          <pre>{generatedCode}</pre>
        </div>
      )}
    </div>
  );
};

export default AppGeneratorForm;