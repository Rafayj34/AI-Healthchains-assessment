const { loadMockData } = require('../utils/dataLoader');

// Health check endpoint
const healthCheck = (req, res) => {
  res.json({ status: 'ok', message: 'Backend API is running' });
};

// Get platform statistics
const getStats = async (req, res) => {
  try {
    const data = await loadMockData();
    
    const stats = {
      totalPatients: (data.patients || []).length,
      totalRecords: (data.records || []).length,
      totalConsents: (data.consents || []).length,
      activeConsents: (data.consents || []).filter(c => c.status === 'active').length,
      pendingConsents: (data.consents || []).filter(c => c.status === 'pending').length,
      totalTransactions: (data.transactions || []).length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  healthCheck,
  getStats
};


