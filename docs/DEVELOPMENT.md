# Development Guide

## 🛠️ Development Workflow

### 1. Backend Development

#### Starting the Backend
```bash
cd backend
npm install
npm run dev
```

#### Adding New API Endpoints
1. Create new route file in `src/routes/`
2. Import and use in `server.js`
3. Add proper error handling
4. Test with Postman or curl

#### Example: Adding a new endpoint
```javascript
// src/routes/newRoute.js
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

module.exports = router;
```

### 2. Extension Development

#### Testing the Extension
1. Make changes to extension files
2. Go to `chrome://extensions/`
3. Click refresh on your extension
4. Test on YouTube

#### Debugging
- Use Chrome DevTools for popup debugging
- Check `chrome://extensions/` for background script errors
- Use `console.log()` in content scripts

#### Content Script Development
- Content scripts run in the page context
- Use `chrome.runtime.sendMessage()` to communicate with background
- Access DOM elements directly

### 3. Communication Between Extension and Backend

#### Extension → Backend
```javascript
// In content script or popup
const response = await fetch('http://localhost:5001/api/videos/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ videoData, keywords })
});
```

#### Backend → Extension
```javascript
// In backend routes
res.json({
  success: true,
  data: { shouldHide: true, confidence: 0.9 }
});
```

## 🔧 Common Issues

### CORS Issues
- Ensure backend CORS is configured for extension origin
- Add extension ID to allowed origins

### Content Script Not Loading
- Check manifest.json matches array
- Verify file paths are correct
- Check for JavaScript errors

### Backend Connection Issues
- Verify backend is running on correct port
- Check firewall settings
- Ensure CORS configuration

## 📝 Code Style

### JavaScript
- Use ES6+ features
- Consistent indentation (2 spaces)
- Meaningful variable names
- Comment complex logic

### File Organization
- Keep related functionality together
- Use descriptive file names
- Separate concerns (UI, logic, data)

## 🧪 Testing

### Manual Testing
1. Test all extension features on YouTube
2. Verify backend API endpoints work
3. Check error handling scenarios
4. Test with different video types

### Automated Testing (Future)
- Unit tests for backend functions
- Integration tests for API endpoints
- Extension testing with Puppeteer

## 🚀 Deployment Checklist

### Backend
- [ ] Environment variables set
- [ ] Database configured
- [ ] CORS settings updated
- [ ] Error handling in place
- [ ] Logging configured

### Extension
- [ ] Icons added
- [ ] Manifest updated
- [ ] Production backend URL
- [ ] Error handling tested
- [ ] User experience polished

## 📚 Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [YouTube API Documentation](https://developers.google.com/youtube/v3)
- [OpenAI API Documentation](https://platform.openai.com/docs)
