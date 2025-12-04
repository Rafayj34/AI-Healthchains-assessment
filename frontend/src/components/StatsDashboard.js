import React, { useCallback } from 'react';
import './StatsDashboard.css';
import { useStats } from '../hooks/useStats';

const StatsDashboard = () => {
  const {
    data: stats,
    isLoading,
    isError,
    error,
    isFetching,
  } = useStats();

  const formatNumber = useCallback((num) => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString('en-US');
  }, []);

  if (isLoading) {
    return (
      <div className="stats-dashboard-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="stats-dashboard-container">
        <div className="error">
          Error loading statistics: {error?.message || 'No data available'}
        </div>
      </div>
    );
  }

  return (
    <div className="stats-dashboard-container">
      <div className="stats-header">
        <h2>Platform Statistics</h2>
        {isFetching && (
          <span className="updating-indicator">Updating...</span>
        )}
      </div>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-label">Total Patients</div>
          <div className="stat-value">{formatNumber(stats.totalPatients)}</div>
          <div className="stat-description">Registered patients in the system</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Records</div>
          <div className="stat-value">{formatNumber(stats.totalRecords)}</div>
          <div className="stat-description">Medical records stored</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Consents</div>
          <div className="stat-value">{formatNumber(stats.totalConsents)}</div>
          <div className="stat-description">All consent records</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Consents</div>
          <div className="stat-value">{formatNumber(stats.activeConsents)}</div>
          <div className="stat-description">Currently active consents</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Pending Consents</div>
          <div className="stat-value">{formatNumber(stats.pendingConsents)}</div>
          <div className="stat-description">Awaiting activation</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Total Transactions</div>
          <div className="stat-value">{formatNumber(stats.totalTransactions)}</div>
          <div className="stat-description">Blockchain transactions</div>
        </div>
      </div>
    </div>
  );
};

export default StatsDashboard;


