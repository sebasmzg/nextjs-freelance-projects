'use client'; // Required for onClick event and signOut

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Optional: Add a loading state indicator

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession(); // Get session status for loading/user info
  const router = useRouter();

  const handleLogout = async () => {

    await signOut({ redirect: false, callbackUrl: '/login' });
    router.push('/');
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            My Dashboard
            {session?.user?.name && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                (Welcome, {session.user.name})
              </span>
            )}
          </h1>
          <button
            onClick={handleLogout}
            className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </header>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Next Freelance
        </div>
      </footer> 
    </div>
  );
}