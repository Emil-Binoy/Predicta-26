import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { useEffect, Suspense } from 'react';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { getStorageItem, removeStorageItem } from './utils/storage';
import { STORAGE_KEYS } from './constants/storageKeys';
import { ROUTES } from './constants/routes';

// Lazy loading pages for better performance
const Home = React.lazy(() => import('./pages/Home/Home'));
const Registration = React.lazy(() => import('./pages/Registration/Registration'));
const Prediction = React.lazy(() => import('./pages/Prediction/Prediction'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard/AdminDashboard'));
const LearnMore = React.lazy(() => import('./pages/LearnMore/LearnMore'));
const Insights = React.lazy(() => import('./pages/Insights/Insights'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#090909]">
    <div className="flex flex-col items-center gap-4">
      <svg className="animate-spin h-10 w-10 text-[#d4af37]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-gray-400 font-medium tracking-widest text-sm uppercase">Loading...</p>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    const checkParticipant = async () => {
      const predictionId = getStorageItem(STORAGE_KEYS.PREDICTION_ID);
      if (predictionId) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify/${predictionId}`);
          if (res.data.success && !res.data.exists) {
            removeStorageItem(STORAGE_KEYS.PREDICTION_ID);
            removeStorageItem(STORAGE_KEYS.WINNING_TEAM);
            removeStorageItem(STORAGE_KEYS.PREDICTED_GOALS);
            removeStorageItem(STORAGE_KEYS.IS_PREDICTED);
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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.INSIGHTS} element={<Insights />} />
              <Route path={ROUTES.LEARN_MORE} element={<LearnMore />} />
              <Route path={ROUTES.REGISTER} element={<Registration />} />
              <Route path={ROUTES.PREDICT} element={<Prediction />} />
              <Route path={`${ROUTES.ADMIN}/*`} element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
