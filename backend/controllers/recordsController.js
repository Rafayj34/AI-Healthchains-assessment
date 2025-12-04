const { loadMockData } = require('../utils/dataLoader');

// Get patient records by patient ID
const getPatientRecords = async (req, res) => {
  try {
    const data = await loadMockData();
    const records = (data.records || []).filter(r => r.patientId === req.params.id);
    
    res.json({ records });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all records (optional - for future use)
const getAllRecords = async (req, res) => {
  try {
    const data = await loadMockData();
    const { patientId, type, limit = 50 } = req.query;
    
    let records = data.records || [];
    
    if (patientId) {
      records = records.filter(r => r.patientId === patientId);
    }
    
    if (type) {
      records = records.filter(r => r.type.toLowerCase() === type.toLowerCase());
    }
    
    records = records.slice(0, parseInt(limit));
    
    res.json({ records });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPatientRecords,
  getAllRecords
};


