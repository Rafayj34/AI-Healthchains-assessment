import React, { useState, useCallback, useMemo, useEffect } from 'react';
import './PatientList.css';
import { usePatients } from '../hooks/usePatients';
import { useDebounce } from '../hooks/useDebounce';

const ITEMS_PER_PAGE = 10;


const PatientList = ({ onSelectPatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
 
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
  } = usePatients({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearchTerm,
  });


  const patients = useMemo(() => data?.patients || [], [data?.patients]);
  const pagination = useMemo(() => data?.pagination || null, [data?.pagination]);

 
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

 
  const handlePatientClick = useCallback((patientId) => {
    if (onSelectPatient) {
      onSelectPatient(patientId);
    }
  }, [onSelectPatient]);


  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  
  const formatWalletAddress = useCallback((address) => {
    if (!address) return 'N/A';
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  }, []);

  
  if (isLoading) {
    return (
      <div className="patient-list-container">
        <div className="loading">Loading patients...</div>
      </div>
    );
  }

  
  if (isError) {
    return (
      <div className="patient-list-container">
        <div className="error">
          Error loading patients: {error?.message || 'An unexpected error occurred'}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <h2>Patients</h2>
        <input
          type="text"
          placeholder="Search by name, email, or patient ID..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search patients"
        />
      </div>
 
      {isFetching && !isLoading && (
        <div className="fetching-indicator">
          Updating...
        </div>
      )}

      {patients.length === 0 ? (
        <div className="placeholder">
          <p>No patients found{debouncedSearchTerm ? ` matching "${debouncedSearchTerm}"` : ''}</p>
        </div>
      ) : (
        <div className="patient-list">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="patient-card"
              onClick={() => handlePatientClick(patient.id)}
            >
              <div className="patient-card-header">
                <div>
                  <div className="patient-name">{patient.name}</div>
                  <div className="patient-id">ID: {patient.patientId}</div>
                </div>
              </div>
              
              <div className="patient-info">
                {patient.email && (
                  <div className="patient-info-item">
                    <span>📧</span>
                    <span>{patient.email}</span>
                  </div>
                )}
                {patient.phone && (
                  <div className="patient-info-item">
                    <span>📞</span>
                    <span>{patient.phone}</span>
                  </div>
                )}
                {patient.dateOfBirth && (
                  <div className="patient-info-item">
                    <span>🎂</span>
                    <span>
                      {new Date(patient.dateOfBirth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
                {patient.gender && (
                  <div className="patient-info-item">
                    <span>👤</span>
                    <span>{patient.gender}</span>
                  </div>
                )}
              </div>

              {patient.walletAddress && (
                <div className="patient-wallet">
                  Wallet: {formatWalletAddress(patient.walletAddress)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isFetching}
            aria-label="Previous page"
          >
            Previous
          </button>
          
          <div className="pagination-info">
            Page {pagination.page} of {pagination.totalPages} 
            {pagination.total > 0 && (
              <span className="pagination-total">
                ({pagination.total} total)
              </span>
            )}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages || isFetching}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientList;


