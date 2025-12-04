import React, { useMemo, useCallback } from 'react';
import './PatientDetail.css';
import { usePatient } from '../hooks/usePatient';
import { usePatientRecords } from '../hooks/usePatientRecords';

const PatientDetail = ({ patientId, onBack }) => {
  const {
    data: patient,
    isLoading: patientLoading,
    isError: patientError,
    error: patientErrorData,
  } = usePatient(patientId);

  const {
    data: records = [],
    isLoading: recordsLoading,
    isError: recordsError,
  } = usePatientRecords(patientId);

  const isLoading = patientLoading || recordsLoading;
  const isError = patientError || recordsError;
  const error = patientErrorData?.message || (patientError ? 'Failed to load patient' : null);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const formatDateTime = useCallback((dateString) => {
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

  const getRecordTypeClass = useCallback((type) => {
    const typeLower = type?.toLowerCase() || '';
    if (typeLower.includes('diagnostic')) return 'diagnostic';
    if (typeLower.includes('treatment')) return 'treatment';
    if (typeLower.includes('lab')) return 'lab';
    return '';
  }, []);

  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }, [records]);

  if (isLoading) {
    return (
      <div className="patient-detail-container">
        <div className="loading">Loading patient details...</div>
      </div>
    );
  }

  if (isError || !patient) {
    return (
      <div className="patient-detail-container">
        <div className="error">
          Error loading patient: {error || 'Patient not found'}
        </div>
        <button onClick={onBack} className="back-btn">Back to List</button>
      </div>
    );
  }

  return (
    <div className="patient-detail-container">
      <div className="patient-detail-header">
        <button onClick={onBack} className="back-btn">← Back to List</button>
      </div>

      <div className="patient-detail-content">
        <div className="patient-info-section">
          <h2>Patient Information</h2>
          <div className="patient-info-grid">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{patient.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Patient ID</span>
              <span className="info-value">{patient.patientId || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{patient.email || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{patient.phone || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{formatDate(patient.dateOfBirth)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{patient.gender || 'N/A'}</span>
            </div>
            <div className="info-item full-width">
              <span className="info-label">Address</span>
              <span className="info-value">{patient.address || 'N/A'}</span>
            </div>
            <div className="info-item full-width">
              <span className="info-label">Wallet Address</span>
              <span className="info-value wallet" title={patient.walletAddress}>
                {formatWalletAddress(patient.walletAddress)}
              </span>
            </div>
          </div>
        </div>

        <div className="patient-records-section">
          <h2>Medical Records ({sortedRecords.length})</h2>
          {sortedRecords.length === 0 ? (
            <div className="placeholder">
              <p>No medical records found for this patient</p>
            </div>
          ) : (
            <div className="records-list">
              {sortedRecords.map((record) => (
                <div key={record.id} className="record-card">
                  <div className="record-header">
                    <div>
                      <div className="record-title">{record.title || 'Untitled Record'}</div>
                      <span className={`record-type ${getRecordTypeClass(record.type)}`}>
                        {record.type || 'Unknown'}
                      </span>
                    </div>
                    <span className={`record-status ${record.status || 'pending'}`}>
                      {record.status === 'verified' ? '✓ Verified' : '⏳ Pending'}
                    </span>
                  </div>
                  {record.description && (
                    <div className="record-description">{record.description}</div>
                  )}
                  <div className="record-meta">
                    {record.date && (
                      <div className="record-meta-item">
                        <span>📅</span>
                        <span>{formatDateTime(record.date)}</span>
                      </div>
                    )}
                    {record.doctor && (
                      <div className="record-meta-item">
                        <span>👨‍⚕️</span>
                        <span>{record.doctor}</span>
                      </div>
                    )}
                    {record.hospital && (
                      <div className="record-meta-item">
                        <span>🏥</span>
                        <span>{record.hospital}</span>
                      </div>
                    )}
                  </div>
                  {record.blockchainHash && (
                    <div className="record-hash">
                      <strong>Blockchain Hash:</strong> {record.blockchainHash}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;


