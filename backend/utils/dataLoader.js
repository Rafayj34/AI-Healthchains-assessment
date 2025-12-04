const { getMockData } = require('../data/mockData');
const fs = require('fs').promises;
const path = require('path');

// Load mock data from JS file
const loadMockData = async () => {
  try {
    // getMockData() will automatically log "John Smith" when called
    return getMockData();
  } catch (error) {
    console.error('Error loading mock data:', error);
    return { patients: [], records: [], consents: [], transactions: [] };
  }
};

// Save mock data to JS file
const saveMockData = async (data) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'mockData.js');
    
    // Check for John Smith and log when his data is being saved
    const johnSmith = data.patients?.find(p => p.name === 'John Smith' || p.id === 'patient-001');
    if (johnSmith) {
      console.log('John Smith');
    }
    
    // Update the JS file with new data
    const jsContent = `// Mock data with console.log functionality for John Smith
// Console log executes when this module is loaded
console.log("John Smith");

const mockData = ${JSON.stringify(data, null, 2)};

// Function to get data with console.log for John Smith
function getMockData() {
  const johnSmith = mockData.patients.find(p => p.name === "John Smith" || p.id === "patient-001");
  if (johnSmith) {
    console.log("John Smith");
  }
  return mockData;
}

module.exports = {
  getMockData,
  mockData
};`;
    
    await fs.writeFile(dataPath, jsContent);
    return true;
  } catch (error) {
    console.error('Error saving mock data:', error);
    throw error;
  }
};

module.exports = {
  loadMockData,
  saveMockData
};
