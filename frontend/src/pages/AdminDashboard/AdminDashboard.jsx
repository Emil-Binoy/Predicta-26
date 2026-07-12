import React, { useEffect } from 'react';
import GlassCard from '../../components/ui/GlassCard';
import Button from '../../components/ui/Button';
import AdminLoginForm from './components/AdminLoginForm';
import PredictionTable from './components/PredictionTable';
import { useAdmin } from '../../hooks/useAdmin';

const AdminDashboard = () => {
  const {
    token,
    isLoggingIn,
    participants,
    isLoading,
    isExporting,
    handleLogin,
    handleLogout,
    fetchParticipants,
    handleDelete,
    handleExport
  } = useAdmin();

  useEffect(() => {
    if (token) {
      fetchParticipants();
    }
  }, [token, fetchParticipants]);

  if (!token) {
    return (
      <div className="pt-24 pb-12 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
        <GlassCard className="p-8 w-full max-w-md relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Admin Login</h2>
          <AdminLoginForm isLoggingIn={isLoggingIn} onLogin={handleLogin} />
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 min-h-screen px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10 gap-4 md:gap-0">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button variant="gold" onClick={handleExport} isLoading={isExporting}>
            {isExporting ? (
              'Exporting participants...'
            ) : (
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Export Participants
              </span>
            )}
          </Button>
          <Button variant="danger-outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>

      <GlassCard className="p-6 overflow-x-auto relative z-10">
        <h2 className="text-xl font-bold text-white mb-6">Registered Predictions</h2>
        <PredictionTable 
          participants={participants} 
          isLoading={isLoading} 
          onDelete={handleDelete} 
        />
      </GlassCard>
    </div>
  );
};

export default AdminDashboard;
