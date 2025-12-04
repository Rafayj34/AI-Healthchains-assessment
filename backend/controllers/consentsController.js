const { loadMockData, saveMockData } = require('../utils/dataLoader');

// Get all consents with optional filters
const getConsents = async (req, res) => {
  try {
    const data = await loadMockData();
    const { patientId, status } = req.query;
    
    let consents = data.consents || [];
    
    if (patientId) {
      consents = consents.filter(c => c.patientId === patientId);
    }
    
    if (status) {
      consents = consents.filter(c => c.status === status);
    }
    
    res.json({ consents });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get consent by ID
const getConsentById = async (req, res) => {
  try {
    const data = await loadMockData();
    const consent = data.consents.find(c => c.id === req.params.id);
    
    if (!consent) {
      return res.status(404).json({ error: 'Consent not found' });
    }
    
    res.json(consent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new consent
const createConsent = async (req, res) => {
  try {
    const { patientId, purpose, walletAddress, signature } = req.body;
    
    if (!patientId || !purpose || !walletAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const data = await loadMockData();
    const newConsent = {
      id: `consent-${Date.now()}`,
      patientId,
      purpose,
      walletAddress,
      signature: signature || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      blockchainTxHash: null
    };
    
    data.consents.push(newConsent);
    await saveMockData(data);
    
    res.status(201).json(newConsent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update consent status
const updateConsent = async (req, res) => {
  try {
    const { status, blockchainTxHash } = req.body;
    const data = await loadMockData();
    const consent = data.consents.find(c => c.id === req.params.id);
    
    if (!consent) {
      return res.status(404).json({ error: 'Consent not found' });
    }
    
    if (status) consent.status = status;
    if (blockchainTxHash) consent.blockchainTxHash = blockchainTxHash;
    
    await saveMockData(data);
    
    res.json(consent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getConsents,
  getConsentById,
  createConsent,
  updateConsent
};


