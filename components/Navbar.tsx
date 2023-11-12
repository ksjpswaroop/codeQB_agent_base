import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import styles from '../styles/navbar.css';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            <img src="/logo.png" alt="Company Logo" />
          </a>
        </Link>
      </div>
      <div className={styles.links}>
        {!session ? (
          <>
            <Link href="/auth/signin">
              <a onClick={(e) => {
                e.preventDefault();
                signIn();
              }}>Sign In</a>
            </Link>
            <Link href="/auth/signup">
              <a>Sign Up</a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
            <Link href="/tools">
              <a>Tools</a>
            </Link>
            <a onClick={(e) => {
              e.preventDefault();
              signOut();
            }}>Sign Out</a>
          </>
        )}
        {session?.user && session.user.role === 'SUPER_ADMIN' && (
          <Link href="/superadmin">
            <a>Super Admin</a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;