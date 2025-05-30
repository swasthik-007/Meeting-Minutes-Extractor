const fs = require('fs');
const path = require('path');

// Configuration
const API_BASE_URL = 'http://localhost:3000';
const SAMPLE_MEETINGS_DIR = path.join(__dirname, '..', 'sample_meetings');

// Test data
const sampleText = `
Team Sync – May 26

- We'll launch the new product on June 10.
- Ravi to prepare onboarding docs by June 5.
- Priya will follow up with logistics team on packaging delay.
- Beta users requested a mobile-first dashboard.
`;

async function testHealthEndpoint() {
  console.log('\n🔍 Testing Health Endpoint...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/process-meeting`, {
      method: 'GET'
    });
    
    const data = await response.json();
    console.log('✅ Health Check Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('❌ Health Check Failed:', error.message);
  }
}

async function testRawTextInput() {
  console.log('\n🔍 Testing Raw Text Input...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/process-meeting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: sampleText
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Raw Text Test Successful:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Raw Text Test Failed:', data);
    }
  } catch (error) {
    console.error('❌ Raw Text Test Error:', error.message);
  }
}

async function testJSONInput() {
  console.log('\n🔍 Testing JSON Input...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/process-meeting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: sampleText })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ JSON Test Successful:');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ JSON Test Failed:', data);
    }
  } catch (error) {
    console.error('❌ JSON Test Error:', error.message);
  }
}

async function testFileUpload(filename) {
  console.log(`\n🔍 Testing File Upload: ${filename}...`);
  try {
    const filePath = path.join(SAMPLE_MEETINGS_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${filePath}`);
      return;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const formData = new FormData();
    const blob = new Blob([fileContent], { type: 'text/plain' });
    formData.append('meeting_file', blob, filename);

    const response = await fetch(`${API_BASE_URL}/api/process-meeting`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log(`✅ File Upload Test (${filename}) Successful:`);
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(`❌ File Upload Test (${filename}) Failed:`, data);
    }
  } catch (error) {
    console.error(`❌ File Upload Test (${filename}) Error:`, error.message);
  }
}

async function testErrorHandling() {
  console.log('\n🔍 Testing Error Handling...');
  try {
    const response = await fetch(`${API_BASE_URL}/api/process-meeting`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: '' })
    });

    const data = await response.json();
    
    if (response.status === 400) {
      console.log('✅ Error Handling Test Successful (Empty input handled correctly):');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Error Handling Test Failed - Expected 400 status');
    }
  } catch (error) {
    console.error('❌ Error Handling Test Error:', error.message);
  }
}

// Main test runner
async function runTests() {
  console.log('🚀 Starting API Tests...');
  console.log(`📍 Testing API at: ${API_BASE_URL}`);
  
  await testHealthEndpoint();
  await testRawTextInput();
  await testJSONInput();
  await testFileUpload('meeting1.txt');
  await testFileUpload('meeting2.txt');
  await testErrorHandling();
  
  console.log('\n✨ All tests completed!');
  console.log('\n📝 cURL Examples:');
  console.log(`
# Test with raw text:
curl -X POST ${API_BASE_URL}/api/process-meeting \\
  -H "Content-Type: text/plain" \\
  -d "Team meeting - We decided to launch on June 10. John will prepare docs by June 5."

# Test with JSON:
curl -X POST ${API_BASE_URL}/api/process-meeting \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Team meeting - We decided to launch on June 10. John will prepare docs by June 5."}'

# Test with file upload:
curl -X POST ${API_BASE_URL}/api/process-meeting \\
  -F "meeting_file=@sample_meetings/meeting1.txt"
  `);
}

// Handle both direct execution and module import
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests };