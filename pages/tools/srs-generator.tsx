import { useState } from 'react';
import { useUser, generateSRS } from '../../lib/auth';
import Layout from '../../components/Layout';
import SrsGeneratorForm from '../../components/tools/SrsGeneratorForm';
import { userRoles, permissions } from '../../types';

const SrsGeneratorPage = () => {
  const [srsDocument, setSrsDocument] = useState('');
  const { user, loading } = useUser({
    redirectTo: '/login',
    redirectIfFound: false,
  });

  const handleSrsGeneration = async (prompt: string) => {
    if (!user || user.role !== userRoles.CorporateAdmin) {
      alert('You do not have permission to generate SRS documents.');
      return;
    }

    try {
      const generatedSrs = await generateSRS(prompt);
      setSrsDocument(generatedSrs);
    } catch (error) {
      console.error('Failed to generate SRS document:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1>Software Requirements Specification (SRS) Generator</h1>
      <SrsGeneratorForm onGenerate={handleSrsGeneration} />
      {srsDocument && (
        <div>
          <h2>Generated SRS Document</h2>
          <pre>{srsDocument}</pre>
        </div>
      )}
    </Layout>
  );
};

export default SrsGeneratorPage;