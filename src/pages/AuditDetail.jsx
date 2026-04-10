import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { initialClaims } from '../data/mockData';
import { initialClaims as dataReset } from '../data/mockData';
import { ArrowLeft, CheckCircle2, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuditDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  // Using a mock state update (in reality, update global state or DB)
  const claimIndex = initialClaims.findIndex(c => c.id === id);
  const [claim, setClaim] = useState(initialClaims[claimIndex]);
  const [overrideComment, setOverrideComment] = useState('');

  if (!claim) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
        <h2>Claim not found</h2>
        <button className="btn btn-secondary" onClick={() => navigate('/auditor')}>Go Back</button>
      </div>
    );
  }

  const handleOverride = (newStatus) => {
    if (!overrideComment && claim.status !== newStatus) {
      alert("Please provide an override comment.");
      return;
    }
    
    // Create new claim object
    const updatedClaim = { ...claim, status: newStatus, overridden: true, overrideComment };
    setClaim(updatedClaim);
    
    // In a real app, you would send this to backend. 
    // Here we just update local state to reflect the change visually.
    alert(`Claim ${updatedClaim.id} has been manually set to ${newStatus.toUpperCase()}`);
    navigate('/auditor');
  };

  const getStatusIcon = (status) => {
    if (status === 'approved') return <CheckCircle2 color="var(--status-approved)" size={24} />;
    if (status === 'flagged') return <AlertTriangle color="var(--status-flagged)" size={24} />;
    return <XCircle color="var(--status-rejected)" size={24} />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex-between" style={{ marginBottom: '2rem' }}>
        <button className="btn" style={{ background: 'transparent', padding: '0.5rem 0' }} onClick={() => navigate('/auditor')}>
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        <div className="flex-center" style={{ gap: '0.75rem' }}>
          <span style={{ fontWeight: 600 }}>Current Audit Status:</span>
          <span className={`badge ${claim.status}`} style={{ fontSize: '1rem', padding: '0.4rem 1rem' }}>
            {getStatusIcon(claim.status)} <span style={{ marginLeft: '0.5rem' }}>{claim.status}</span>
          </span>
        </div>
      </div>

      <div className="grid-2">
        {/* Left Side: Receipt Image & Extraction */}
        <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)' }}>
            <h3>Document Evidence</h3>
          </div>
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img 
              src={claim.receiptImage} 
              alt="Receipt" 
              style={{ width: '100%', height: '300px', objectFit: 'cover' }} 
            />
          </div>
          <div style={{ padding: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>AI Extracted Data</h4>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '0.85rem' }}>Merchant Name</p>
                <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>{claim.extractedData.merchant}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem' }}>Date</p>
                <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>{claim.extractedData.date}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem' }}>Total Amount</p>
                <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>{claim.extractedData.total.toFixed(2)} {claim.extractedData.currency}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.85rem' }}>Business Purpose</p>
                <p style={{ fontWeight: 500, color: 'var(--text-main)' }}>{claim.purpose}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Policy Context & Overrides */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ background: 'var(--primary-glow)', padding: '0.75rem', borderRadius: '12px' }}>
                <ShieldAlert size={28} color="var(--primary)" />
              </div>
              <div>
                <h3 style={{ marginBottom: '0.25rem' }}>Automated Policy Auditor</h3>
                <p style={{ fontSize: '0.9rem' }}>AI evaluation based on company travel & expense policy.</p>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--primary)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Policy Snippet Referenced</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-main)' }}>"{claim.policySnippet}"</p>
            </div>

            <div>
              <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>AI Decision Reason:</span>
              <p style={{ color: claim.status === 'approved' ? 'var(--status-approved)' : claim.status === 'rejected' ? 'var(--status-rejected)' : 'var(--status-flagged)' }}>
                {claim.aiReason}
              </p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Human Override Control</h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>As an auditor, you can override the AI decision by providing a justification.</p>
            
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={16} /> Override Comment
              </label>
              <textarea 
                className="form-textarea" 
                rows="3" 
                placeholder="Explain why you are overriding the AI decision..."
                value={overrideComment}
                onChange={(e) => setOverrideComment(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn" 
                style={{ flex: 1, background: 'var(--status-approved-bg)', color: 'var(--status-approved)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                onClick={() => handleOverride('approved')}
              >
                Force Approve
              </button>
              <button 
                className="btn" 
                style={{ flex: 1, background: 'var(--status-rejected-bg)', color: 'var(--status-rejected)', border: '1px solid rgba(239, 68, 68, 0.2)' }}
                onClick={() => handleOverride('rejected')}
              >
                Force Reject
              </button>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// Needed mock import for ShieldAlert in the file above since I missed it previously
function ShieldAlert(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke={props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
      <path d="M12 8v4"/>
      <path d="M12 16h.01"/>
    </svg>
  )
}
