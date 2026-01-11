import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {FaSun, FaMoon} from 'react-icons/fa';
import {HiSun, HiMoon} from 'react-icons/hi2'; // Heroicons (dari Tailwind)
import {AnimatePresence, motion} from 'framer-motion';

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
        <motion.button whileHover={{rotate: 50, scale: 1.3}} onClick={() => setDark(!dark)} className="p-2 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={dark ? 'dark' : 'light'} initial={{y: -20, opacity: 0, rotate: -90}} animate={{y: 0, opacity: 1, rotate: 0}} exit={{y: 20, opacity: 0, rotate: 90}} transition={{duration: 0.2}}>
              {dark ? <HiSun className="text-yellow-400" /> : <HiMoon className="text-slate-700" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </nav>
  );
}
