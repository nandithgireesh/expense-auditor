import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, CheckCircle2, FileText, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EmployeePortal() {
  const [file, setFile] = useState(null);
  const [purpose, setPurpose] = useState('');
  const [category, setCategory] = useState('Meals');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'application/pdf': [] },
    maxFiles: 1
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !purpose) return;

    setIsSubmitting(true);
    
    // Simulate AI processing & Mock OCR / Policy Check
    setTimeout(() => {
      setIsSubmitting(false);
      // Randomly assign a status for demonstration purposes
      const statuses = ['approved', 'flagged', 'rejected'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      let reason = "";
      if (status === 'approved') reason = "Expense is within the allowed limit for this category.";
      else if (status === 'flagged') reason = "The receipt date does not match the claimed date. Minor discrepancy.";
      else reason = "Expense limit exceeded for this region by 20%.";

      setAuditResult({
        status,
        reason
      });
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: '800px', margin: '0 auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1>Digital Receipt Ingestion</h1>
        <p>Upload your expense evidence and provide a justification for reimbursement.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <AnimatePresence mode="wait">
          {!auditResult ? (
            <motion.form 
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label className="form-label">Upload Receipt Evidence (Image or PDF)</label>
                <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                  <input {...getInputProps()} />
                  {file ? (
                    <>
                      <FileText className="dropzone-icon" />
                      <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>{file.name}</p>
                      <p style={{ fontSize: '0.85rem' }}>Click or drag to replace</p>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="dropzone-icon" />
                      <p>Drag & drop your receipt here, or click to browse</p>
                      <p style={{ fontSize: '0.85rem' }}>Supports JPG, PNG, and PDF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="expense-category">Expense Category</label>
                <select 
                  id="expense-category"
                  className="form-input" 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ appearance: 'none' }}
                >
                  <option value="Meals">Meals</option>
                  <option value="Transport">Transport</option>
                  <option value="Lodging">Lodging</option>
                  <option value="Supplies">Supplies</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="business-purpose">Business Purpose / Justification</label>
                <textarea 
                  id="business-purpose"
                  className="form-textarea" 
                  rows="4" 
                  placeholder="Describe the context for this spend (e.g., Client dinner with ACME Corp to finalize Q3 contract)"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}
                disabled={isSubmitting || !file || !purpose}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} size={20} />
                    <span>Auditing Expense against Policy...</span>
                  </>
                ) : (
                  <span>Submit for AI Audit</span>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div 
              key="result"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ textAlign: 'center', padding: '2rem 0' }}
            >
              <CheckCircle2 size={64} color="var(--status-approved)" style={{ margin: '0 auto 1.5rem auto' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>Submission Received</h2>
              <p style={{ marginBottom: '2rem' }}>Our AI has processed your receipt against the Travel & Expense Policy.</p>
              
              <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)', marginBottom: '2rem', textAlign: 'left' }}>
                <div className="flex-between" style={{ marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600 }}>Audit Status:</span>
                  <span className={`badge ${auditResult.status}`}>{auditResult.status}</span>
                </div>
                <div>
                  <span style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>AI Explanation:</span>
                  <p>{auditResult.reason}</p>
                </div>
              </div>

              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setAuditResult(null);
                  setFile(null);
                  setPurpose('');
                }}
              >
                Submit Another Expense
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
