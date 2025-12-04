const { loadMockData } = require('../utils/dataLoader');

// Get all patients with pagination and search
const getPatients = async (req, res) => {
  try {
    const data = await loadMockData();
    const { page = 1, limit = 10, search = '' } = req.query;
    
    let patients = data.patients || [];
    
    // Search filter
    if (search) {
      patients = patients.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.patientId.includes(search)
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPatients = patients.slice(startIndex, endIndex);
    
    res.json({
      patients: paginatedPatients,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: patients.length,
        totalPages: Math.ceil(patients.length / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get patient by ID
const getPatientById = async (req, res) => {
  try {
    const data = await loadMockData();
    const patient = data.patients.find(p => p.id === req.params.id);
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPatients,
  getPatientById
};


