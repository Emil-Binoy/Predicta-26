import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const [participants, setParticipants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (token) {
            fetchParticipants();
        }
    }, [token]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/admin/login`, { username, password });
            if (res.data.success) {
                toast.success('Login successful!');
                localStorage.setItem('adminToken', res.data.token);
                setToken(res.data.token);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        setToken('');
        setParticipants([]);
    };

    const fetchParticipants = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/participants`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.data.success) {
                setParticipants(res.data.data);
            }
        } catch (error) {
            toast.error('Failed to fetch participants. Session might be expired.');
            handleLogout();
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="pt-24 pb-12 min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>
                <div className="glass-card p-8 w-full max-w-md relative z-10">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1c2541] border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-[#d4af37] focus:outline-none transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-3 bg-gradient-to-r from-[#d4af37] to-[#c5a028] text-black font-bold rounded-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all disabled:opacity-50"
                        >
                            {isLoggingIn ? 'Logging in...' : 'Login Securely 🔒'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-12 min-h-screen px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gradient">Admin Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="px-6 py-2 bg-[rgba(227,30,36,0.1)] border border-[#E31E24] text-[#E31E24] font-medium rounded-lg hover:bg-[#E31E24] hover:text-white transition-colors"
                >
                    Logout
                </button>
            </div>

            <div className="glass-card p-6 overflow-x-auto relative z-10">
                <h2 className="text-xl font-bold text-white mb-6">Registered Predictions</h2>
                
                {isLoading ? (
                    <div className="text-center py-12 text-gray-400 animate-pulse">Loading participant data...</div>
                ) : participants.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">No predictions found yet.</div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-gray-600 bg-[rgba(255,255,255,0.02)]">
                                <th className="p-4 text-gray-300 font-semibold rounded-tl-lg">Name</th>
                                <th className="p-4 text-gray-300 font-semibold">Student ID</th>
                                <th className="p-4 text-gray-300 font-semibold">Course/Batch</th>
                                <th className="p-4 text-[#d4af37] font-semibold text-center">Predicted Team</th>
                                <th className="p-4 text-[#50c878] font-semibold text-center">Predicted Goals</th>
                                <th className="p-4 text-gray-300 font-semibold rounded-tr-lg">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participants.map((user) => (
                                <tr key={user._id} className="border-b border-gray-700/50 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
                                    <td className="p-4 text-white font-medium">{user.name}</td>
                                    <td className="p-4 text-gray-400">{user.studentId}</td>
                                    <td className="p-4 text-gray-400">{user.course} - {user.batch}</td>
                                    <td className="p-4 text-[#d4af37] font-bold text-center bg-[rgba(212,175,55,0.05)]">{user.winningTeam || 'Pending'}</td>
                                    <td className="p-4 text-[#50c878] font-bold text-center bg-[rgba(80,200,120,0.05)]">{user.winningMargin || 'Pending'}</td>
                                    <td className="p-4 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
