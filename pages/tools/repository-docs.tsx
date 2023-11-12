import { NextPage } from 'next';
import { useState } from 'react';
import { RepositoryDocsForm } from '../../components/tools/RepositoryDocsForm';
import { useUser } from '../../lib/auth';
import { userRoles, permissions } from '../../types';
import Layout from '../../components/Layout';

const RepositoryDocsPage: NextPage = () => {
  const [docsGenerated, setDocsGenerated] = useState<string | null>(null);
  const { user, loading } = useUser();

  const handleGenerateDocs = async (repositoryUrl: string) => {
    // Placeholder for actual documentation generation logic
    // This should be replaced with an API call or a server-side operation
    const generatedDocs = `Documentation for repository at ${repositoryUrl} has been generated.`;
    setDocsGenerated(generatedDocs);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user || user.role !== userRoles.CorporateAdmin) {
    return (
      <Layout>
        <p>You do not have permission to access this page.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Repository Documentation Generator</h1>
      <RepositoryDocsForm onGenerateDocs={handleGenerateDocs} />
      {docsGenerated && <div className="generated-docs">{docsGenerated}</div>}
    </Layout>
  );
};

export default RepositoryDocsPage;