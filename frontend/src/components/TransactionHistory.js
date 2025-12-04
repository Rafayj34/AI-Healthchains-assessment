import React, { useState, useCallback, useMemo } from 'react';
import './TransactionHistory.css';
import { useTransactions } from '../hooks/useTransactions';

const TransactionHistory = ({ account }) => {
  const [filterByWallet, setFilterByWallet] = useState(false);
  
  // Only filter by wallet if filter is enabled AND account exists
  const walletAddress = filterByWallet && account ? account : null;
  
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useTransactions(walletAddress, 20);

  const formatAddress = useCallback((address) => {
    if (!address) return 'N/A';
    if (address.length <= 14) return address;
    return `${address.slice(0, 8)}...${address.slice(-6)}`;
  }, []);

  const formatDate = useCallback((timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, []);

  const formatTxHash = useCallback((hash) => {
    if (!hash) return 'N/A';
    if (hash.length <= 16) return hash;
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  }, []);

  const getTypeClass = useCallback((type) => {
    const typeLower = type?.toLowerCase() || '';
    if (typeLower.includes('consent')) return 'consent_approval';
    if (typeLower.includes('data')) return 'data_access';
    return '';
  }, []);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="transaction-history-container">
        <div className="loading">Loading transactions...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="transaction-history-container">
        <div className="error">
          Error loading transactions: {error?.message || 'An unexpected error occurred'}
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-history-container">
      <div className="transaction-header">
        <h2>Transaction History</h2>
        {account && (
          <div className="wallet-filter-controls">
            <button
              className={`filter-toggle ${filterByWallet ? 'active' : ''}`}
              onClick={() => setFilterByWallet(!filterByWallet)}
            >
              {filterByWallet ? 'Show All' : 'Filter by My Wallet'}
            </button>
            {filterByWallet && (
              <div className="wallet-filter">
                Filtering for: {formatAddress(account)}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="transactions-list">
        {sortedTransactions.length === 0 ? (
          <div className="placeholder">
            <p>
              No transactions found
              {filterByWallet && account ? ` for wallet ${formatAddress(account)}` : ''}
            </p>
          </div>
        ) : (
          sortedTransactions.map((tx) => (
            <div key={tx.id} className="transaction-card">
              <div className="transaction-header-info">
                <div>
                  <span className={`transaction-type ${getTypeClass(tx.type)}`}>
                    {tx.type?.replace('_', ' ').toUpperCase() || 'UNKNOWN'}
                  </span>
                </div>
                <span className={`transaction-status ${tx.status || 'pending'}`}>
                  {tx.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}
                </span>
              </div>

              <div className="transaction-details">
                <div className="transaction-detail-item">
                  <span className="transaction-detail-label">From</span>
                  <span className="transaction-detail-value address" title={tx.from}>
                    {formatAddress(tx.from)}
                  </span>
                </div>
                <div className="transaction-detail-item">
                  <span className="transaction-detail-label">To</span>
                  <span className="transaction-detail-value address" title={tx.to}>
                    {formatAddress(tx.to)}
                  </span>
                </div>
                <div className="transaction-detail-item">
                  <span className="transaction-detail-label">Amount</span>
                  <span className="transaction-amount">
                    {tx.amount || '0'} {tx.currency || 'ETH'}
                  </span>
                </div>
                <div className="transaction-detail-item">
                  <span className="transaction-detail-label">Timestamp</span>
                  <span className="transaction-timestamp">
                    {formatDate(tx.timestamp)}
                  </span>
                </div>
                {tx.blockNumber && (
                  <div className="transaction-detail-item">
                    <span className="transaction-detail-label">Block Number</span>
                    <span className="transaction-detail-value">
                      {tx.blockNumber.toLocaleString()}
                    </span>
                  </div>
                )}
                {tx.blockchainTxHash && (
                  <div className="transaction-detail-item full-width">
                    <span className="transaction-detail-label">Transaction Hash</span>
                    <span className="transaction-detail-value hash" title={tx.blockchainTxHash}>
                      {formatTxHash(tx.blockchainTxHash)}
                    </span>
                  </div>
                )}
                {tx.gasUsed && tx.gasPrice && (
                  <div className="transaction-detail-item">
                    <span className="transaction-detail-label">Gas Used</span>
                    <span className="transaction-detail-value">
                      {parseInt(tx.gasUsed).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;


