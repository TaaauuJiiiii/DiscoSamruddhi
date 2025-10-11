const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.ROUTEWAY_API_KEY;
const url = 'https://api.routeway.ai/v1/chat/completions';

const data = {
    model: 'deepseek-v3.2-exp:free',
    messages: [
        {
            role: 'user',
            content: 'Say this is a test!',
        },
    ],
};

const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
};

console.log('Testing Routeway API...');
console.log('API Key exists:', !!apiKey);
console.log('API Key length:', apiKey ? apiKey.length : 0);
console.log('URL:', url);
console.log('Payload:', JSON.stringify(data, null, 2));

axios
    .post(url, data, { headers })
    .then(response => {
        console.log('SUCCESS!');
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('ERROR:');
        console.error('Error type:', error.name);
        console.error('Error message:', error.message);
        
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response status text:', error.response.statusText);
            console.error('Response headers:', error.response.headers);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            console.error('Request was made but no response received');
            console.error('Request details:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
    });
