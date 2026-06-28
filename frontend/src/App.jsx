import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Prediction from './pages/Prediction';
import AdminDashboard from './pages/AdminDashboard';
import LearnMore from './pages/LearnMore';

function App() {
  useEffect(() => {
    const checkParticipant = async () => {
      const predictionId = localStorage.getItem('predictionId');
      if (predictionId) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify/${predictionId}`);
          if (res.data.success && !res.data.exists) {
            localStorage.removeItem('predictionId');
            localStorage.removeItem('winningTeam');
            localStorage.removeItem('predictedGoals');
            localStorage.removeItem('isPredicted');
            window.location.reload();
          }
        } catch (error) {
          console.error('Failed to verify participant', error);
        }
      }
    };
    checkParticipant();
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col text-white">
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/predict" element={<Prediction />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
