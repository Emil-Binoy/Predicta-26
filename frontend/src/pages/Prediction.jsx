import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

const Prediction = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [predictionId, setPredictionId] = useState(() => localStorage.getItem('predictionId') || location.state?.predictionId || '');
    const [winningTeam, setWinningTeam] = useState(() => localStorage.getItem('winningTeam') || '');
    const [predictedGoals, setPredictedGoals] = useState(() => localStorage.getItem('predictedGoals') || '');
    const [isPredicted, setIsPredicted] = useState(() => localStorage.getItem('isPredicted') === 'true');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        if (!predictionId) {
            toast.error('Please register first to make a prediction.');
            navigate('/register');
            return;
        }

        const handleResize = () => setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [predictionId, navigate]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!predictionId) {
            toast.error('Prediction ID is missing. Please register first.');
            return;
        }
        if (!winningTeam) {
            toast.error('Please enter the winning team');
            return;
        }
        if (!predictedGoals) {
            toast.error('Please enter the predicted goals');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post('http://localhost:5000/api/auth/predict', {
                predictionId,
                winningTeam,
                winningMargin: predictedGoals
            });

            if (res.data.success) {
                setShowConfetti(true);
                toast.success('Prediction submitted successfully!');
                
                // Save prediction to localStorage
                localStorage.setItem('winningTeam', winningTeam);
                localStorage.setItem('predictedGoals', predictedGoals);
                localStorage.setItem('isPredicted', 'true');
                setIsPredicted(true);

                setTimeout(() => {
                    navigate('/');
                }, 5000);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Prediction failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pt-24 pb-12 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {showConfetti && <Confetti width={windowDimension.width} height={windowDimension.height} />}

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 w-full max-w-3xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Make Your Prediction</h2>
                    <p className="text-gray-300">Who will lift the trophy?</p>
                </div>

                <form onSubmit={onSubmit} className="space-y-8">
                    {!isPredicted ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Winning Team</label>
                                <input
                                    type="text"
                                    value={winningTeam}
                                    onChange={(e) => setWinningTeam(e.target.value)}
                                    className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                    placeholder="Type the winning team name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Predict the Goals</label>
                                <input
                                    type="text"
                                    value={predictedGoals}
                                    onChange={(e) => setPredictedGoals(e.target.value)}
                                    className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                    placeholder="e.g. 2 Goals"
                                />
                            </div>

                            {winningTeam && predictedGoals && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-[rgba(80,200,120,0.1)] border border-[#50c878] rounded-lg text-center"
                                >
                                    <p className="text-[#50c878] font-medium">
                                        You predict <span className="font-bold text-white">{winningTeam}</span> with <span className="font-bold text-white">{predictedGoals} goals</span>.
                                    </p>
                                </motion.div>
                            )}

                            <div className="pt-4 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-12 py-4 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black font-bold text-lg rounded-full hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all disabled:opacity-50 flex items-center gap-2"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Lock Prediction ⚽'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-8 bg-[rgba(80,200,120,0.1)] border-2 border-[#50c878] rounded-xl text-center shadow-[0_0_15px_rgba(80,200,120,0.2)]"
                        >
                            <h3 className="text-2xl font-bold text-white mb-2">Prediction Locked! 🔒</h3>
                            <p className="text-lg text-[#50c878]">
                                You predicted <span className="font-bold text-white">{winningTeam}</span> with <span className="font-bold text-white">{predictedGoals} goals</span>.
                            </p>
                            <p className="text-sm text-gray-400 mt-4">Good luck! You cannot change this prediction.</p>
                        </motion.div>
                    )}
                </form>
            </motion.div>
        </div>
    );
};

export default Prediction;
