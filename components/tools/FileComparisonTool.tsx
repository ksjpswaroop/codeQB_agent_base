import { useState } from 'react';
import Layout from '../Layout';
import { permissions, validateUser } from '../../lib/auth';

const FileComparisonTool = () => {
  const [fileContentOne, setFileContentOne] = useState('');
  const [fileContentTwo, setFileContentTwo] = useState('');
  const [comparisonResult, setComparisonResult] = useState('');

  const handleFileOneChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFileContentOne(event.target.value);
  };

  const handleFileTwoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFileContentTwo(event.target.value);
  };

  const compareFiles = () => {
    // This is a placeholder for the actual comparison logic
    if (fileContentOne === fileContentTwo) {
      setComparisonResult('The files are identical.');
    } else {
      setComparisonResult('The files are different.');
    }
  };

  // Ensure the user has the right permissions to use this tool
  if (!validateUser(permissions.USE_FILE_COMPARISON_TOOL)) {
    return (
      <Layout>
        <p>You do not have permission to use this tool.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="file-comparison-tool">
        <h1>File Comparison Tool</h1>
        <div className="file-inputs">
          <div>
            <h2>File 1</h2>
            <textarea
              id="fileContentOne"
              value={fileContentOne}
              onChange={handleFileOneChange}
              placeholder="Paste the content of the first file here"
            />
          </div>
          <div>
            <h2>File 2</h2>
            <textarea
              id="fileContentTwo"
              value={fileContentTwo}
              onChange={handleFileTwoChange}
              placeholder="Paste the content of the second file here"
            />
          </div>
        </div>
        <button onClick={compareFiles}>Compare</button>
        <div className="comparison-result">
          <h2>Comparison Result</h2>
          <p>{comparisonResult}</p>
        </div>
      </div>
      <style jsx>{`
        .file-comparison-tool {
          max-width: 600px;
          margin: auto;
        }
        .file-inputs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        textarea {
          width: 100%;
          min-height: 200px;
          margin-bottom: 20px;
        }
        button {
          padding: 10px 20px;
          cursor: pointer;
        }
        .comparison-result {
          margin-top: 20px;
        }
      `}</style>
    </Layout>
  );
};

export default FileComparisonTool;