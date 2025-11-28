import { Link } from 'react-router';
import { usePuterStore } from '~/lib/puter';

const Navbar = () => {
  const { auth } = usePuterStore();

  return (
    <nav className='navbar'>
      <Link to='/'>
        <p className='text-2xl font-bold text-gradient uppercase'>resumind</p>
      </Link>
      <div className='flex flex-row items-center justify-between gap-4'>
        <Link to='/upload' className='primary-button w-fit'>
          Upload Resume
        </Link>

        {auth.isAuthenticated && (
          <button className='primary-button w-fit' onClick={auth.signOut}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
