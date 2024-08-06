import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../utils/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false); // state to track if user is authenticated
  const router = useRouter();

  // Check if the user is authenticated on component mount
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

   // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center w-full">
      <div className="flex items-center space-x-8">
        <Link href="/">
          <a className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Blog Platform
          </a>
        </Link>
      </div>
      <div className="flex items-center space-x-8">
        {isAuth && (
          <Link href="/dashboard">
            <a className="text-gray-700 hover:text-gray-900 transition flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Dashboard
            </a>
          </Link>
        )}
        {isAuth ? (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 transition flex items-center"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </button>
        ) : (
          <>
            <Link href="/login">
              <a className="text-gray-700 hover:text-gray-900 transition flex items-center">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </a>
            </Link>
            <Link href="/signup">
              <a className="text-gray-700 hover:text-gray-900 transition flex items-center">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Signup
              </a>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
