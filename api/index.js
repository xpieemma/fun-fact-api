import express from 'express';
import axios from 'axios';

const app = express();


// Middleware for logging 
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// a configured axios instance for the Useless Facts API
const uselessFactsClient = axios.create({
  baseURL: 'https://uselessfacts.jsph.pl/api/v2/facts',
  timeout: 5000,
  headers: { 'Accept': 'application/json' }
});

// interceptors 
uselessFactsClient.interceptors.request.use(
  config => {
    console.log('Fetching random fact from external API...');
    return config;
  },
  error => Promise.reject(error)
);

uselessFactsClient.interceptors.response.use(
  response => {
    console.log('Successfully received fact from external API');
    return response;
  },
  error => {
    console.error('Response interceptor error:', error.message);
    return Promise.reject(error);
  }
);

// fact endpoint
app.get('/api/fun-fact', async (req, res) => {
  try {
    const response = await uselessFactsClient.get('/random');
    const factText = response.data.text;
    res.json({
      fact: factText,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    handleError(error, res);
  }
});

// Multiple facts endpoint
app.get('/api/fun-facts/:count', async (req, res) => {
  const count = parseInt(req.params.count) || 1;
  if (count > 10) {
    return res.status(400).json({ error: 'Maximum of 10 facts allowed' });
  }
  try {
    const promises = Array(count).fill().map(() => uselessFactsClient.get('/random'));
    const responses = await Promise.all(promises);
    const facts = responses.map(response => ({
      fact: response.data.text,
      timestamp: new Date().toISOString()
    }));
    res.json({ facts });
  } catch (error) {
    console.error('Error fetching multiple facts:', error.message);
    res.status(500).json({ error: 'Could not fetch fun facts' });
  }
});

// Root route 
// app.get('/', (req, res) => {
//   res.send(`
//     <h1>Welcome to The Daily Grind Fun Fact API</h1>
//     <p>Try <a href="/api/fun-fact">/api/fun-fact</a></p>
//   `);
// });

// Error handling helper
function handleError(error, res) {
  console.error('Error fetching fun fact:', error.message);
  if (error.response) {
    res.status(502).json({ error: 'Could not fetch fun fact', details: 'External service returned an error' });
  } else if (error.request) {
    res.status(503).json({ error: 'Could not fetch fun fact', details: 'External service unavailable' });
  } else {
    res.status(500).json({ error: 'Could not fetch fun fact', details: 'Internal server error' });
  }
}


if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 30000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


export default app;