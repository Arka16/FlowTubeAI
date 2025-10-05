# FlowTube AI Backend - Simple Version

A minimal backend server with just 2 endpoints for the FlowTube AI Chrome Extension.

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

3. **Server will run on:** `http://localhost:5001`

## 📡 API Endpoints

### 1. Health Check
- **URL:** `GET /health`
- **Description:** Check if the server is running
- **Response:**
  ```json
  {
    "status": "OK",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "message": "FlowTube AI Backend is running"
  }
  ```

### 2. Text Logging
- **URL:** `POST /api/log-text`
- **Description:** Log text input to console
- **Request Body:**
  ```json
  {
    "text": "Your text input here"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Text logged successfully",
    "receivedText": "Your text input here",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
  ```

## 🧪 Testing

### Test Health Check
```bash
curl http://localhost:5001/health
```

### Test Text Logging
```bash
curl -X POST http://localhost:5001/api/log-text \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello from FlowTube AI!"}'
```

## 📁 File Structure
```
backend/
├── server.js          # Main server file
├── package.json       # Dependencies
└── README.md         # This file
```

## 🔧 Dependencies
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **nodemon**: Development auto-reload (dev dependency)

That's it! Simple and clean. 🎯
