# AI Health Chains - Web3 MERN Stack Developer Assessment

## Overview

This assessment is designed to evaluate your skills as a Senior Web3 MERN Stack Developer. The project is a healthcare data management platform that integrates blockchain technology for consent tracking and data integrity.

## Project Structure

```
.
├── backend/          # Complete Node.js/Express API (DO NOT MODIFY)
│   ├── controllers/ # 5 controllers for different resources
│   │   ├── patientsController.js
│   │   ├── recordsController.js
│   │   ├── consentsController.js
│   │   ├── transactionsController.js
│   │   └── healthController.js
│   ├── routes/      # Route definitions
│   │   └── index.js
│   ├── utils/       # Utility functions
│   │   └── dataLoader.js
│   ├── data/        # JSON mockup database
│   ├── server.js    # Express server entry point
│   └── package.json
├── frontend/         # React application (YOUR WORK AREA)
│   ├── src/
│   │   ├── components/  # React components to implement
│   │   ├── hooks/       # Custom React hooks
│   │   └── services/    # API service layer
│   └── package.json
└── README.md        # This file
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension installed
- Basic understanding of React, Web3, and REST APIs

## Setup Instructions

### 1. Install Dependencies

From the root directory, run:

```bash
npm run install-all
```

Or install separately:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Backend Server

```bash
cd backend
npm start
```

The backend will run on `http://localhost:5000`

### 3. Start the Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`

## Assessment Tasks

### Your Mission

Complete the frontend implementation by filling in the TODO sections in the following components:

### 1. PatientList Component (`frontend/src/components/PatientList.js`)

**Tasks:**
- Implement `fetchPatients` function to load patients from the API
- Add search functionality with proper input handling
- Display patients in a card-based layout
- Implement pagination controls
- Make patient cards clickable to view details

**API Endpoint:** `GET /api/patients?page=1&limit=10&search=`

### 2. PatientDetail Component (`frontend/src/components/PatientDetail.js`)

**Tasks:**
- Fetch and display patient information (name, email, DOB, gender, phone, address, wallet)
- Fetch and display patient's medical records
- Format dates properly
- Show record types with appropriate styling
- Display blockchain hash for each record

**API Endpoints:**
- `GET /api/patients/:id`
- `GET /api/patients/:id/records`

### 3. ConsentManagement Component (`frontend/src/components/ConsentManagement.js`)

**Tasks:**
- Fetch and display consents (with filtering by status)
- Implement consent creation with MetaMask signature
- Sign a message using the `signMessage` function from `useWeb3` hook
- Send signed consent to the backend API
- Update consent status (pending → active)
- Display consent details including blockchain transaction hash

**API Endpoints:**
- `GET /api/consents?status=active`
- `POST /api/consents`
- `PATCH /api/consents/:id`

**Web3 Integration:**
- Use `signMessage` from `useWeb3` hook to sign consent messages
- Format: `"I consent to: {purpose} for patient: {patientId}"`

### 4. TransactionHistory Component (`frontend/src/components/TransactionHistory.js`)

**Tasks:**
- Fetch and display blockchain transactions
- Filter transactions by connected wallet address
- Format addresses (truncate with ellipsis)
- Format dates and timestamps
- Display transaction type, amount, status, and blockchain hash
- Show transaction details in a clean card layout

**API Endpoint:** `GET /api/transactions?walletAddress=&limit=20`

### 5. StatsDashboard Component (`frontend/src/components/StatsDashboard.js`)

**Tasks:**
- Fetch platform statistics
- Display stats in an attractive grid layout
- Show: Total Patients, Total Records, Total Consents, Active Consents, Pending Consents, Total Transactions
- Use appropriate styling and visual hierarchy

**API Endpoint:** `GET /api/stats`

## API Documentation

### Base URL
`http://localhost:5000/api`

### Available Endpoints

#### Health Check
- `GET /health` - Check API status

#### Patients
- `GET /patients?page=1&limit=10&search=` - Get paginated patients
- `GET /patients/:id` - Get patient by ID
- `GET /patients/:id/records` - Get patient records

#### Consents
- `GET /consents?patientId=&status=` - Get consents (with optional filters)
- `GET /consents/:id` - Get consent by ID
- `POST /consents` - Create new consent
  ```json
  {
    "patientId": "patient-001",
    "purpose": "Research Study Participation",
    "walletAddress": "0x...",
    "signature": "0x..."
  }
  ```
- `PATCH /consents/:id` - Update consent status
  ```json
  {
    "status": "active",
    "blockchainTxHash": "0x..."
  }
  ```

#### Transactions
- `GET /transactions?walletAddress=&limit=20` - Get transactions

#### Statistics
- `GET /stats` - Get platform statistics

#### Signature Verification
- `POST /verify-signature` - Verify wallet signature
  ```json
  {
    "message": "I consent to...",
    "signature": "0x...",
    "address": "0x..."
  }
  ```

## Web3 Integration

### MetaMask Connection

The `useWeb3` hook is already implemented and provides:
- `account` - Connected wallet address
- `isConnected` - Connection status
- `connectWallet()` - Connect MetaMask
- `disconnectWallet()` - Disconnect wallet
- `signMessage(message)` - Sign a message with MetaMask

### Example Usage

```javascript
import { useWeb3 } from '../hooks/useWeb3';

const { account, signMessage, isConnected } = useWeb3();

// Sign a message
const message = "I consent to: Research Study for patient: patient-001";
const signature = await signMessage(message);
```

## Evaluation Criteria

Your implementation will be evaluated on:

1. **Functionality** (40%)
   - All components work correctly
   - API integration is proper
   - Web3 integration works with MetaMask

2. **Code Quality** (30%)
   - Clean, readable code
   - Proper error handling
   - Loading states
   - No console errors

3. **UI/UX** (20%)
   - Responsive design
   - Good visual hierarchy
   - User-friendly interactions
   - Proper loading and error states

4. **Best Practices** (10%)
   - React hooks usage
   - Component structure
   - Code organization
   - Comments where needed

## Important Notes

- **DO NOT modify the backend code** - It's complete and working
- **DO NOT modify** `WalletConnection.js` - It's already implemented
- Focus on completing the TODO sections in the components
- Use the existing CSS files - they're already styled
- Test with MetaMask connected and disconnected
- Handle edge cases (no data, errors, loading states)

## Time Estimate

This assessment should take approximately 4-6 hours to complete thoroughly.

## Submission

1. Complete all TODO sections
2. Ensure the application runs without errors
3. Test all functionality
4. Provide a brief summary of your implementation approach

## Questions?

If you have any questions about the assessment, please reach out to the hiring team.

Good luck! 🚀

