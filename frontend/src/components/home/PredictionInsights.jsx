import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import apiClient from '../../services/apiClient';
import { getStorageItem } from '../../utils/storage';

const getFlagEmoji = (teamName) => {
  if (!teamName) return '🏳️';
  const flags = {
    argentina: '🇦🇷',
    brazil: '🇧🇷',
    france: '🇫🇷',
    germany: '🇩🇪',
    spain: '🇪🇸',
    england: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    portugal: '🇵🇹',
    italy: '🇮🇹',
    netherlands: '🇳🇱',
    belgium: '🇧🇪',
    croatia: '🇭🇷',
    morocco: '🇲🇦',
    uruguay: '🇺🇾',
    usa: '🇺🇸',
    mexico: '🇲🇽',
  };
  return flags[teamName.toLowerCase().trim()] || '🏳️';
};

const COLORS = ['#E31E24', '#0057D9', '#00C853', '#d4af37', '#9c27b0', '#ff9800', '#00bcd4', '#8bc34a'];

const CountUpNumber = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const end = parseInt(value, 10) || 0;
    if (end === 0) return;

    const incrementTime = Math.max(Math.abs(Math.floor(duration / end)), 10);
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const PredictionInsights = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/api/statistics');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return null;
  if (!stats) return null;

  const {
    totalParticipants,
    totalPredictions,
    totalTeamsPredicted,
    teamPopularity,
    mostPopularTeam,
    leastPopularTeam,
  } = stats;

  const barData = teamPopularity.map((item) => ({
    name: `${getFlagEmoji(item.team)} ${item.team}`,
    count: item.count,
    percentage: item.percentage,
  }));

  const pieData = teamPopularity.map((item) => ({
    name: item.team,
    value: item.percentage,
  }));

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      id="insights"
      className="w-full max-w-7xl mx-auto px-4 py-20 relative z-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="text-center mb-12">
        <span className="inline-block py-1 px-3 rounded-full bg-[rgba(0,200,83,0.1)] border border-[#00C853] text-[#00C853] text-sm font-semibold tracking-wider mb-4">
          LIVE ANALYTICS
        </span>
        <h2 className="text-4xl md:text-5xl font-bebas font-bold mb-4 uppercase">
          Prediction Insights
        </h2>
        <p className="text-lg text-gray-400 font-light">
          See how participants are predicting the FIFA World Cup Final.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-2 text-gradient-primary font-bold">
            <CountUpNumber value={totalParticipants} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">👥 Total Participants</h3>
          <p className="text-sm text-gray-400">Registered Students</p>
        </motion.div>
        
        <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-2 text-gradient-primary font-bold">
            <CountUpNumber value={totalPredictions} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">⚽ Total Predictions</h3>
          <p className="text-sm text-gray-400">Predictions Submitted</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-2 text-gradient-primary font-bold">
            <CountUpNumber value={totalTeamsPredicted} />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">🏆 Teams Predicted</h3>
          <p className="text-sm text-gray-400">Different Teams Selected</p>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <div className="text-4xl mb-2 text-gradient-primary font-bold truncate w-full">
            {mostPopularTeam ? mostPopularTeam.team : '-'}
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">📈 Most Predicted Team</h3>
          <p className="text-sm text-gray-400">
            {mostPopularTeam ? `${mostPopularTeam.count} Predictions • ${mostPopularTeam.percentage}%` : 'No data'}
          </p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Team Popularity</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#B5B5B5', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#B5B5B5', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#1D1D1D', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" fill="#E31E24" radius={[4, 4, 0, 0]} animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6 text-center">Prediction Distribution</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={1500}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1D1D1D', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`${value}%`, 'Percentage']}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {mostPopularTeam && (
          <motion.div variants={itemVariants} className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-[#0057D9]">
            <div className="text-5xl">{getFlagEmoji(mostPopularTeam.team)}</div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Most Popular Team</p>
              <h4 className="text-2xl font-bold text-white mb-1">{mostPopularTeam.team}</h4>
              <p className="text-sm font-medium text-[#0057D9]">
                {mostPopularTeam.count} Predictions ({mostPopularTeam.percentage}%)
              </p>
            </div>
          </motion.div>
        )}
        
        {leastPopularTeam && (
          <motion.div variants={itemVariants} className="glass-card p-6 flex items-center gap-4 border-l-4 border-l-[#E31E24]">
            <div className="text-5xl">{getFlagEmoji(leastPopularTeam.team)}</div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Least Popular Team</p>
              <h4 className="text-2xl font-bold text-white mb-1">{leastPopularTeam.team}</h4>
              <p className="text-sm font-medium text-[#E31E24]">
                {leastPopularTeam.count} Predictions ({leastPopularTeam.percentage}%)
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default PredictionInsights;
