# Web3 MERN Stack Assessment - Implementation Tasks

## Overview

Healthcare data management platform with blockchain-based consent tracking. Backend is production-ready and locked. Frontend implementation is the assessment scope.

## Implementation Tasks

### 1. PatientList Component
**File:** `frontend/src/components/PatientList.js`

**Requirements:**
- Display paginated patient list
- Implement search functionality
- Navigate to patient detail view

**API Endpoints:**
- `GET /api/patients` - List patients with pagination
- `GET /api/patients?search={query}` - Search patients

---

### 2. PatientDetail Component
**File:** `frontend/src/components/PatientDetail.js`

**Requirements:**
- Display patient information
- Show associated medical records
- Handle loading and error states

**API Endpoints:**
- `GET /api/patients/:id` - Get patient details
- `GET /api/records/patient/:patientId` - Get patient records

---

### 3. ConsentManagement Component
**File:** `frontend/src/components/ConsentManagement.js`

**Requirements:**
- Create new consents with MetaMask signature
- Filter consents by status (active/pending)
- Update consent status
- Display blockchain transaction hashes

**API Endpoints:**
- `GET /api/consents` - List consents with optional status filter
- `POST /api/consents` - Create consent (requires signature)
- `PUT /api/consents/:id` - Update consent status
- `POST /api/transactions/verify` - Verify signature

**Web3 Integration:**
- Use `useWeb3` hook for wallet connection
- Implement message signing workflow
- Handle signature verification

---

### 4. TransactionHistory Component *(Optional - Nice to Have)*
**File:** `frontend/src/components/TransactionHistory.js`

**Requirements:**
- Display all blockchain transactions
- Filter transactions by wallet address
- Show transaction details (hash, timestamp, type)

**API Endpoints:**
- `GET /api/transactions` - List all transactions
- `GET /api/transactions?wallet={address}` - Filter by wallet

**Web3 Integration:**
- Use connected wallet address for filtering
- Display transaction metadata

---

### 5. StatsDashboard Component *(Optional - Nice to Have)*
**File:** `frontend/src/components/StatsDashboard.js`

**Requirements:**
- Display platform-wide statistics
- Visualize data (charts, metrics)
- Real-time data updates

**API Endpoints:**
- `GET /api/health/stats` - Get platform statistics

---

## Available Infrastructure

**Hooks:**
- `useWeb3.js` - Wallet connection, account management, provider access

**Services:**
- `apiService.js` - REST API client with error handling

**Components:**
- `WalletConnection.js` - Wallet connection UI (implemented)

---

## Technical Requirements

**Stack:**
- React 18
- ethers.js v6
- MetaMask integration

**Standards:**
- Component-based architecture
- Proper error handling
- Loading state management
- Responsive design
- React hooks (useState, useEffect)
