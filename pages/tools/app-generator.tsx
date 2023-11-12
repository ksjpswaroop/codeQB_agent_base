import { useState } from 'react';
import { useUser } from '../../lib/auth';
import { generateApp } from '../../components/tools/AppGeneratorForm';
import Layout from '../../components/Layout';

const AppGeneratorPage = () => {
  const [srsDocument, setSrsDocument] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const { user } = useUser({ redirectTo: '/login' });

  const handleSrsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSrsDocument(event.target.value);
  };

  const handleGenerateApp = async () => {
    if (!srsDocument) {
      alert('Please provide an SRS document.');
      return;
    }
    try {
      const code = await generateApp(srsDocument);
      setGeneratedCode(code);
    } catch (error) {
      alert('Failed to generate the app. Please try again.');
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="app-generator-container">
        <h1>App Generator</h1>
        <textarea
          placeholder="Paste your SRS/PRD document here..."
          value={srsDocument}
          onChange={handleSrsChange}
        />
        <button onClick={handleGenerateApp}>Generate App</button>
        {generatedCode && (
          <div className="generated-code">
            <h2>Generated Code:</h2>
            <pre>{generatedCode}</pre>
          </div>
        )}
      </div>
      <style jsx>{`
        .app-generator-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }
        textarea {
          width: 100%;
          height: 200px;
          margin-bottom: 20px;
        }
        button {
          padding: 10px 20px;
          cursor: pointer;
        }
        .generated-code {
          margin-top: 20px;
          background: #f5f5f5;
          padding: 10px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  );
};

export default AppGeneratorPage;