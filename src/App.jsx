import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import EmployeePortal from './pages/EmployeePortal';
import AuditorDashboard from './pages/AuditorDashboard';
import AuditDetail from './pages/AuditDetail';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="container animate-fade-in">
        <Routes>
          <Route path="/" element={<EmployeePortal />} />
          <Route path="/auditor" element={<AuditorDashboard />} />
          <Route path="/auditor/claim/:id" element={<AuditDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
