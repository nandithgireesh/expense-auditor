import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, User, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="flex-center" style={{ gap: '0.75rem' }}>
        <ShieldCheck color="var(--primary)" size={28} />
        <h3 style={{ margin: 0, fontWeight: 700, letterSpacing: '0.5px' }}>Expense Auditor</h3>
      </div>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link flex-center ${location.pathname === '/' ? 'active' : ''}`}
          style={{ gap: '0.5rem' }}
        >
          <User size={18} />
          <span>Employee Portal</span>
        </Link>
        <Link 
          to="/auditor" 
          className={`nav-link flex-center ${location.pathname.startsWith('/auditor') ? 'active' : ''}`}
          style={{ gap: '0.5rem' }}
        >
          <LayoutDashboard size={18} />
          <span>Auditor Dashboard</span>
        </Link>
      </div>
    </nav>
  );
}
