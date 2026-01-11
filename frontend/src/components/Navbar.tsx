import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [dark]);

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md dark:bg-gray-900 dark:text-white transition-colors">
      <h1 className="text-xl font-bold">MyPortfolio</h1>
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-blue-500">
          Home
        </Link>
        <motion.button whileTap={{scale: 0.9}} whileHover={{rotate: 10}} onClick={() => setDark(!dark)} className="cursor-pointer p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:ring-2 ring-blue-500 transition-all">
          {dark ? 'Light Mode' : 'Dark Mode'}
        </motion.button>
      </div>
    </nav>
  );
}
