const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'FlowTube AI Backend is running'
  });
});

// Text logging endpoint
app.post('/api/log-text', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ 
      error: 'Text input is required',
      success: false 
    });
  }

  // Console log the text input
  console.log('📝 Text input received:', text);
  
  res.json({
    success: true,
    message: 'Text logged successfully',
    receivedText: text,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    availableEndpoints: [
      'GET /health',
      'POST /api/log-text'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    error: 'Internal server error',
    success: false
  });
});

app.listen(PORT, () => {
  console.log(`🚀 FlowTube AI Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 Text logging: POST http://localhost:${PORT}/api/log-text`);
});
