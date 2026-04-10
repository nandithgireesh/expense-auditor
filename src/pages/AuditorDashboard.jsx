import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialClaims } from '../data/mockData';
import { Search, Filter, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuditorDashboard() {
  const [claims] = useState(initialClaims);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Sort by risk level (flagged first, then rejected, then approved)
  const getRiskWeight = (status) => {
    if (status === 'flagged') return 1;
    if (status === 'rejected') return 2;
    return 3;
  };

  const filteredClaims = claims.filter(c => filter === 'all' || c.status === filter)
                              .sort((a, b) => getRiskWeight(a.status) - getRiskWeight(b.status));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <div>
          <h1>Finance Auditor Home</h1>
          <p>Review AI-audited claims, overriding automated decisions if necessary.</p>
        </div>
        
        <div className="flex-center" style={{ gap: '1rem' }}>
          <div className="glass-panel flex-center" style={{ padding: '0.5rem 1rem', gap: '0.5rem' }}>
            <Filter size={16} color="var(--text-muted)" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none' }}
            >
              <option value="all" style={{ color: '#000' }}>All Statuses</option>
              <option value="flagged" style={{ color: '#000' }}>Flagged</option>
              <option value="rejected" style={{ color: '#000' }}>Rejected</option>
              <option value="approved" style={{ color: '#000' }}>Approved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Claim ID</th>
                <th>Employee</th>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Audit Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim) => (
                <tr key={claim.id}>
                  <td style={{ fontWeight: 600 }}>{claim.id}</td>
                  <td>{claim.employeeName}</td>
                  <td>{claim.date}</td>
                  <td>{claim.category}</td>
                  <td>{claim.amount.toFixed(2)} {claim.currency}</td>
                  <td>
                    <span className={`badge ${claim.status}`}>{claim.status}</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      onClick={() => navigate(`/auditor/claim/${claim.id}`)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClaims.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <ShieldAlert size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                    <p>No claims found for the selected filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
