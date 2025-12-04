import React, { useState, useCallback } from 'react';
import './ConsentManagement.css';
import { useWeb3 } from '../hooks/useWeb3';
import { useConsents, useCreateConsent, useUpdateConsent } from '../hooks/useConsents';

const ConsentManagement = ({ account }) => {
  const { signMessage, isConnected } = useWeb3();
  const [filterStatus, setFilterStatus] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    purpose: '',
  });

  const statusFilter = filterStatus === 'all' ? null : filterStatus;
  const {
    data: consents = [],
    isLoading,
    isError,
    error,
  } = useConsents(statusFilter);

  const createConsentMutation = useCreateConsent();
  const updateConsentMutation = useUpdateConsent();

  const handleCreateConsent = useCallback(async (e) => {
    e.preventDefault();
    
    if (!account || !isConnected) {
      alert('Please connect your MetaMask wallet first');
      return;
    }

    if (!formData.patientId || !formData.purpose) {
      alert('Please fill in all required fields');
      return;
    }

    setIsCreating(true);
    try {
      const message = `I consent to: ${formData.purpose} for patient: ${formData.patientId}`;
      
      const signature = await signMessage(message);
      
      await createConsentMutation.mutateAsync({
        patientId: formData.patientId,
        purpose: formData.purpose,
        walletAddress: account,
        signature: signature,
      });

      setFormData({ patientId: '', purpose: '' });
      setShowCreateForm(false);
    } catch (err) {
      console.error('Failed to create consent:', err);
      alert('Failed to create consent: ' + (err.message || 'Unknown error'));
    } finally {
      setIsCreating(false);
    }
  }, [account, isConnected, formData, signMessage, createConsentMutation]);

  const handleUpdateStatus = useCallback(async (consentId, newStatus) => {
    try {
      const updates = { status: newStatus };
      
      if (newStatus === 'active') {
        updates.blockchainTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
      }
      
      await updateConsentMutation.mutateAsync({
        id: consentId,
        updates,
      });
    } catch (err) {
      console.error('Failed to update consent:', err);
      alert('Failed to update consent: ' + (err.message || 'Unknown error'));
    }
  }, [updateConsentMutation]);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  const formatWalletAddress = useCallback((address) => {
    if (!address) return 'N/A';
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  }, []);

  const formatTxHash = useCallback((hash) => {
    if (!hash) return 'N/A';
    if (hash.length <= 16) return hash;
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  }, []);

  if (isLoading) {
    return (
      <div className="consent-management-container">
        <div className="loading">Loading consents...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="consent-management-container">
        <div className="error">
          Error loading consents: {error?.message || 'An unexpected error occurred'}
        </div>
      </div>
    );
  }

  return (
    <div className="consent-management-container">
      <div className="consent-header">
        <h2>Consent Management</h2>
        <button
          className="create-btn"
          onClick={() => setShowCreateForm(!showCreateForm)}
          disabled={!account || !isConnected}
        >
          {showCreateForm ? 'Cancel' : 'Create New Consent'}
        </button>
      </div>

      {(!account || !isConnected) && (
        <div className="warning">
          Please connect your MetaMask wallet to manage consents
        </div>
      )}

      {showCreateForm && account && isConnected && (
        <div className="create-consent-form">
          <h3>Create New Consent</h3>
          <form onSubmit={handleCreateConsent}>
            <div className="form-group">
              <label>Patient ID</label>
              <input
                type="text"
                value={formData.patientId}
                onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                required
                placeholder="e.g., patient-001"
                disabled={isCreating}
              />
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                required
                disabled={isCreating}
              >
                <option value="">Select purpose...</option>
                <option value="Research Study Participation">Research Study Participation</option>
                <option value="Data Sharing with Research Institution">Data Sharing with Research Institution</option>
                <option value="Third-Party Analytics Access">Third-Party Analytics Access</option>
                <option value="Insurance Provider Access">Insurance Provider Access</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={isCreating || createConsentMutation.isPending}
            >
              {isCreating || createConsentMutation.isPending 
                ? 'Signing & Creating...' 
                : 'Sign & Create Consent'}
            </button>
          </form>
        </div>
      )}

      <div className="consent-filters">
        <button
          className={filterStatus === 'all' ? 'active' : ''}
          onClick={() => setFilterStatus('all')}
        >
          All
        </button>
        <button
          className={filterStatus === 'active' ? 'active' : ''}
          onClick={() => setFilterStatus('active')}
        >
          Active
        </button>
        <button
          className={filterStatus === 'pending' ? 'active' : ''}
          onClick={() => setFilterStatus('pending')}
        >
          Pending
        </button>
      </div>

      <div className="consents-list">
        {consents.length === 0 ? (
          <div className="placeholder">
            <p>No consents found{filterStatus !== 'all' ? ` with status "${filterStatus}"` : ''}</p>
          </div>
        ) : (
          consents.map((consent) => (
            <div key={consent.id} className="consent-card">
              <div className="consent-header-info">
                <div>
                  <div className="consent-purpose">{consent.purpose || 'Unknown Purpose'}</div>
                </div>
                <span className={`consent-status ${consent.status || 'pending'}`}>
                  {consent.status || 'pending'}
                </span>
              </div>

              <div className="consent-details">
                <div className="consent-detail-item">
                  <strong>Patient ID:</strong>
                  <span>{consent.patientId || 'N/A'}</span>
                </div>
                <div className="consent-detail-item">
                  <strong>Wallet Address:</strong>
                  <span className="consent-wallet" title={consent.walletAddress}>
                    {formatWalletAddress(consent.walletAddress)}
                  </span>
                </div>
                <div className="consent-detail-item">
                  <strong>Created:</strong>
                  <span>{formatDate(consent.createdAt)}</span>
                </div>
                {consent.blockchainTxHash && (
                  <div className="consent-detail-item">
                    <strong>Blockchain TX Hash:</strong>
                    <span className="consent-tx-hash" title={consent.blockchainTxHash}>
                      {formatTxHash(consent.blockchainTxHash)}
                    </span>
                  </div>
                )}
                {consent.signature && (
                  <div className="consent-detail-item">
                    <strong>Signature:</strong>
                    <span className="consent-tx-hash" title={consent.signature}>
                      {formatTxHash(consent.signature)}
                    </span>
                  </div>
                )}
              </div>

              {consent.status === 'pending' && (
                <div className="consent-actions">
                  <button
                    className="action-btn primary"
                    onClick={() => handleUpdateStatus(consent.id, 'active')}
                    disabled={updateConsentMutation.isPending}
                  >
                    {updateConsentMutation.isPending ? 'Updating...' : 'Activate Consent'}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsentManagement;


