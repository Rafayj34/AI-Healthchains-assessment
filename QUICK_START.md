# Quick Start Guide

## For Interviewers/Evaluators

### Setup

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

2. **Start backend (Terminal 1):**
   ```bash
   cd backend
   npm start
   ```
   Backend runs on: http://localhost:5000

3. **Start frontend (Terminal 2):**
   ```bash
   cd frontend
   npm start
   ```
   Frontend runs on: http://localhost:3000

### Testing the Backend

Test the API is working:
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"ok","message":"Backend API is running"}`

### What Candidates Should Complete

Candidates need to implement TODO sections in:
- `frontend/src/components/PatientList.js`
- `frontend/src/components/PatientDetail.js`
- `frontend/src/components/ConsentManagement.js`
- `frontend/src/components/TransactionHistory.js`
- `frontend/src/components/StatsDashboard.js`

### Evaluation Checklist

- [ ] PatientList: Fetches and displays patients with search and pagination
- [ ] PatientDetail: Shows patient info and medical records
- [ ] ConsentManagement: Creates consents with MetaMask signature
- [ ] TransactionHistory: Displays blockchain transactions
- [ ] StatsDashboard: Shows platform statistics
- [ ] All components handle loading/error states
- [ ] MetaMask integration works
- [ ] Code is clean and follows React best practices
- [ ] UI is responsive and user-friendly

## For Candidates

See `ASSESSMENT_INSTRUCTIONS.md` and `README.md` for detailed instructions.


