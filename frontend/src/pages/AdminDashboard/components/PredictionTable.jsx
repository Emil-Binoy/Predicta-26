import React from 'react';

const PredictionTable = ({ participants, isLoading, onDelete }) => {
  if (isLoading) {
    return <div className="text-center py-12 text-gray-400 animate-pulse">Loading participant data...</div>;
  }

  if (participants.length === 0) {
    return <div className="text-center py-12 text-gray-400">No predictions found yet.</div>;
  }

  return (
    <table className="w-full text-left border-collapse min-w-[800px]">
      <thead>
        <tr className="border-b border-gray-600 bg-[rgba(255,255,255,0.02)]">
          <th className="p-4 text-gray-300 font-semibold rounded-tl-lg">Name</th>
          <th className="p-4 text-gray-300 font-semibold">Course/Batch/Sem</th>
          <th className="p-4 text-[#d4af37] font-semibold text-center">Predicted Team</th>
          <th className="p-4 text-[#50c878] font-semibold text-center">Predicted Goals</th>
          <th className="p-4 text-gray-300 font-semibold">Date</th>
          <th className="p-4 text-gray-300 font-semibold rounded-tr-lg">Action</th>
        </tr>
      </thead>
      <tbody>
        {participants.map((user) => (
          <tr key={user._id} className="border-b border-gray-700/50 hover:bg-[rgba(255,255,255,0.03)] transition-colors">
            <td className="p-4 text-white font-medium">{user.name}</td>
            <td className="p-4 text-gray-400">{user.course} - {user.batch} - SEM {user.semester}</td>
            <td className="p-4 text-[#d4af37] font-bold text-center bg-[rgba(212,175,55,0.05)]">{user.winningTeam || 'Pending'}</td>
            <td className="p-4 text-[#50c878] font-bold text-center bg-[rgba(80,200,120,0.05)]">{user.winningMargin || 'Pending'}</td>
            <td className="p-4 text-sm text-gray-500">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="p-4 text-center">
              <button
                onClick={() => onDelete(user._id)}
                className="px-3 py-1 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PredictionTable;
