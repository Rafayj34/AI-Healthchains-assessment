# Backend Controllers Architecture

## Overview

The backend follows an MVC (Model-View-Controller) pattern with 5 dedicated controllers for different resources.

## Controller Structure

### 1. patientsController.js
**Purpose:** Handle all patient-related operations

**Methods:**
- `getPatients(req, res)` - Get paginated list of patients with search
- `getPatientById(req, res)` - Get single patient by ID

**Routes:**
- `GET /api/patients` - List patients (with pagination & search)
- `GET /api/patients/:id` - Get patient by ID

---

### 2. recordsController.js
**Purpose:** Handle medical records operations

**Methods:**
- `getPatientRecords(req, res)` - Get records for a specific patient
- `getAllRecords(req, res)` - Get all records (with optional filters)

**Routes:**
- `GET /api/patients/:id/records` - Get patient's records
- `GET /api/records` - Get all records (optional: patientId, type filters)

---

### 3. consentsController.js
**Purpose:** Handle consent management and blockchain integration

**Methods:**
- `getConsents(req, res)` - Get consents (with optional filters)
- `getConsentById(req, res)` - Get single consent by ID
- `createConsent(req, res)` - Create new consent with signature
- `updateConsent(req, res)` - Update consent status/blockchain hash

**Routes:**
- `GET /api/consents` - List consents (optional: patientId, status filters)
- `GET /api/consents/:id` - Get consent by ID
- `POST /api/consents` - Create new consent
- `PATCH /api/consents/:id` - Update consent

---

### 4. transactionsController.js
**Purpose:** Handle blockchain transactions and signature verification

**Methods:**
- `getTransactions(req, res)` - Get blockchain transactions
- `verifySignature(req, res)` - Verify wallet signatures

**Routes:**
- `GET /api/transactions` - Get transactions (optional: walletAddress filter)
- `POST /api/verify-signature` - Verify signature

---

### 5. healthController.js
**Purpose:** Handle health checks and platform statistics

**Methods:**
- `healthCheck(req, res)` - API health check endpoint
- `getStats(req, res)` - Get platform statistics

**Routes:**
- `GET /api/health` - Health check
- `GET /api/stats` - Platform statistics

---

## Utility Functions

### dataLoader.js
**Purpose:** Centralized data loading and saving utilities

**Functions:**
- `loadMockData()` - Load data from mockData.json
- `saveMockData(data)` - Save data to mockData.json

---

## Route Configuration

All routes are defined in `routes/index.js` and mounted in `server.js`:

```javascript
app.use('/api', apiRoutes);
```

This creates a clean separation of concerns:
- **Controllers** - Business logic
- **Routes** - Route definitions
- **Utils** - Shared utilities
- **Server** - Application setup

---

## Benefits of This Architecture

1. **Separation of Concerns** - Each controller handles one resource
2. **Maintainability** - Easy to find and modify specific functionality
3. **Scalability** - Easy to add new controllers or methods
4. **Testability** - Controllers can be tested independently
5. **Code Organization** - Clear structure for developers

---

## File Structure

```
backend/
├── controllers/
│   ├── patientsController.js      # Patient operations
│   ├── recordsController.js       # Medical records
│   ├── consentsController.js      # Consent management
│   ├── transactionsController.js   # Blockchain transactions
│   └── healthController.js        # Health & stats
├── routes/
│   └── index.js                   # Route definitions
├── utils/
│   └── dataLoader.js              # Data utilities
├── data/
│   └── mockData.json              # Mock database
└── server.js                      # Application entry point
```


