import { NextPage } from 'next';
import Head from 'next/head';
import { useUser } from '../lib/auth';
import Layout from '../components/Layout';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';

const Home: NextPage = () => {
  const user = useUser();

  return (
    <Layout>
      <Head>
        <title>Next.js Modern Web Application</title>
        <meta name="description" content="A modern web application built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to the Next.js Modern Web Application</h1>
        {!user && (
          <div>
            <h2>Login</h2>
            <LoginForm />
            <h2>Sign Up</h2>
            <SignUpForm />
          </div>
        )}
        {user && (
          <div>
            <p>Welcome back, {user.name}!</p>
            {/* Depending on the user role, redirect to the appropriate dashboard */}
            {user.role === 'CorporateAdmin' && <p>Access your <a href="/dashboard">Corporate Dashboard</a></p>}
            {user.role === 'SuperAdmin' && <p>Access the <a href="/superadmin">Super Admin Dashboard</a></p>}
            {user.role === 'EndUser' && <p>Explore our <a href="/tools">Code Assistance Tools</a></p>}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Home;