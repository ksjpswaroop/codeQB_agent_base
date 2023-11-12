import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useUser, validateUser } from '../../lib/auth';
import { db } from '../../lib/db';
import { Corporate, User } from '../../types';
import Layout from '../../components/Layout';
import SettingsForm from '../../components/dashboard/SettingsForm';

const CorporateSettings = () => {
  const router = useRouter();
  const { corporateId } = router.query;
  const [corporate, setCorporate] = useState<Corporate | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    if (corporateId) {
      fetchCorporate(corporateId as string)
        .then(data => {
          setCorporate(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching corporate data:', error);
          setLoading(false);
        });
    }
  }, [corporateId]);

  const handleSettingsUpdate = async (updatedSettings: Corporate) => {
    // Update settings logic here
    // This should include validation and sending the update to the server
    console.log('Updated settings:', updatedSettings);
  };

  if (!validateUser(user, 'CorporateAdmin')) {
    return (
      <Layout>
        <p>You do not have permission to view this page.</p>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    );
  }

  if (!corporate) {
    return (
      <Layout>
        <p>Corporate settings not found.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div id="settingsForm">
        <h1>Corporate Settings</h1>
        <SettingsForm corporate={corporate} onSettingsUpdate={handleSettingsUpdate} />
      </div>
    </Layout>
  );
};

export default CorporateSettings;

export async function getServerSideProps(context) {
  const { corporateId } = context.params;
  const corporate = await db.corporate.findUnique({
    where: { id: corporateId },
  });

  if (!corporate) {
    return {
      notFound: true,
    };
  }

  return {
    props: { corporate },
  };
}