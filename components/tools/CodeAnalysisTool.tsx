import { useState } from 'react';
import { analyzeCode } from '../../lib/utils'; // Assuming analyzeCode is a utility function for code analysis

const CodeAnalysisTool = () => {
  const [code, setCode] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleAnalyzeClick = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await analyzeCode(code);
      setAnalysisResult(result);
    } catch (err) {
      setError('Error analyzing code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Code Efficiency Analysis Tool</h1>
      <textarea
        value={code}
        onChange={handleCodeChange}
        placeholder="Paste your code here..."
        rows={10}
        style={{ width: '100%' }}
      />
      <button onClick={handleAnalyzeClick} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Code'}
      </button>
      {error && <p className="error">{error}</p>}
      {analysisResult && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeAnalysisTool;