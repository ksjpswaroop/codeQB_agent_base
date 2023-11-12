import { NextPage } from 'next';
import { useState } from 'react';
import { useUser } from '../../lib/auth';
import { analyzeCode } from '../../components/tools/CodeAnalysisTool';
import Layout from '../../components/Layout';

const CodeAnalysisPage: NextPage = () => {
  const [code, setCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const { user } = useUser();

  const handleCodeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const handleAnalyzeCode = async () => {
    if (!code) return;
    const result = await analyzeCode(code);
    setAnalysisResult(result);
  };

  if (!user) {
    return (
      <Layout>
        <p>You must be logged in to access this tool.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="code-analysis-container">
        <h1>Code Efficiency Analysis Tool</h1>
        <textarea
          value={code}
          onChange={handleCodeChange}
          placeholder="Paste your code here..."
          rows={10}
        />
        <button onClick={handleAnalyzeCode}>Analyze Code</button>
        {analysisResult && (
          <div className="analysis-result">
            <h2>Analysis Result</h2>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </div>
      <style jsx>{`
        .code-analysis-container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
        }
        textarea {
          width: 100%;
          margin-bottom: 10px;
        }
        button {
          padding: 10px 20px;
          cursor: pointer;
        }
        .analysis-result {
          margin-top: 20px;
          background-color: #f5f5f5;
          padding: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default CodeAnalysisPage;