import { useState } from 'react';
import { useUser } from '../../lib/auth';
import Layout from '../../components/Layout';
import FileComparisonTool from '../../components/tools/FileComparisonTool';

const FileComparisonPage = () => {
  const { user, loading } = useUser();

  // Ensure the user is logged in and has the appropriate role to access this tool
  if (loading) return <p>Loading...</p>;
  if (!user || !user.roles.includes('Corporate Admin') && !user.roles.includes('Super Admin')) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <Layout>
      <h1>File Comparison Tool</h1>
      <FileComparisonTool />
    </Layout>
  );
};

export default FileComparisonPage;