import React, { useState, useEffect } from 'react';
import './StatsDashboard.css';
import { apiService } from '../services/apiService';

const StatsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Implement fetchStats function
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // TODO: Call apiService.getStats()
        // TODO: Update stats state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="stats-dashboard-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="stats-dashboard-container">
        <div className="error">Error loading statistics: {error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="stats-dashboard-container">
      <h2>Platform Statistics</h2>
      
      {/* TODO: Display statistics in a nice grid layout */}
      {/* Show: totalPatients, totalRecords, totalConsents, activeConsents, pendingConsents, totalTransactions */}
      <div className="stats-grid">
        {/* Your implementation here */}
        <div className="placeholder">
          <p>Statistics will be displayed here</p>
          <p>Implement the statistics dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;


