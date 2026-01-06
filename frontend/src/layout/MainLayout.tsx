import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-10">
        <Outlet />
      </main>
      <footer className="py-5 text-center text-sm border-t border-slate-200 dark:border-slate-800 opacity-60">© 2026 Muhammad Al Fatih's Portfolio</footer>
    </div>
  );
}
