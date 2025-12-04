import React from 'react';
import './WalletConnection.css';

const WalletConnection = ({ account, isConnected, onConnect, onDisconnect }) => {
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connection">
      {isConnected ? (
        <div className="wallet-info">
          <div className="wallet-address">
            <span className="wallet-icon">🔗</span>
            <span className="address-text">{formatAddress(account)}</span>
          </div>
          <button className="disconnect-btn" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      ) : (
        <button className="connect-btn" onClick={onConnect}>
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default WalletConnection;


