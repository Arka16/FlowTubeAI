# FlowTube AI - Chrome Extension with Backend

A Chrome extension that uses AI to filter out distracting YouTube videos based on your current task, helping you stay focused and productive.

## 🏗️ Project Structure

```
FlowTubeAI/
├── extension/                    # Chrome Extension Files
│   ├── manifest.json            # Extension manifest
│   ├── popup/                   # Popup UI
│   │   ├── popup.html          # Popup HTML
│   │   └── popup.js            # Popup JavaScript
│   ├── content/                # Content Scripts
│   │   └── content.js          # Main content script for YouTube
│   ├── background/             # Background Scripts
│   │   └── background.js       # Service worker
│   └── assets/                 # Extension assets (icons, images)
├── backend/                     # Backend API Server
│   ├── src/                    # Source code
│   │   ├── routes/             # API routes
│   │   │   ├── videoRoutes.js  # Video-related endpoints
│   │   │   └── aiRoutes.js     # AI-related endpoints
│   │   ├── models/             # Data models
│   │   │   └── VideoModel.js   # Video data model
│   │   ├── utils/              # Utility functions
│   │   │   └── aiService.js    # AI service integration
│   │   ├── config/             # Configuration files
│   │   │   └── database.js     # Database configuration
│   │   └── server.js           # Main server file
│   ├── package.json            # Backend dependencies
│   ├── .env.example           # Environment variables template
│   └── .gitignore             # Backend gitignore
├── docs/                       # Documentation
└── README.md                   # This file
```

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the backend server:**
   ```bash
   npm run dev  # Development mode
   # or
   npm start    # Production mode
   ```

   The backend will run on `http://localhost:5001`

### Extension Setup

1. **Open Chrome and go to Extensions:**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode"

2. **Load the extension:**
   - Click "Load unpacked"
   - Select the `extension` folder

3. **Test the extension:**
   - Go to YouTube
   - Click the extension icon
   - Enter keywords to filter videos

## 🔧 Features

### Extension Features
- **Smart Video Filtering**: Hide distracting videos based on keywords
- **Real-time Updates**: Automatically filters new videos as you scroll
- **Persistent Settings**: Remembers your filter preferences
- **Toggle Control**: Enable/disable filtering with one click
- **YouTube Integration**: Works seamlessly with YouTube's interface

### Backend Features
- **AI-Powered Analysis**: Uses AI to analyze video content
- **RESTful API**: Clean API endpoints for video analysis
- **Keyword Suggestions**: AI suggests relevant keywords for filtering
- **Scalable Architecture**: Built with Express.js and modular structure
- **Error Handling**: Comprehensive error handling and logging

## 📡 API Endpoints

### Video Routes (`/api/videos`)
- `POST /analyze` - Analyze a single video
- `POST /filter` - Filter multiple videos

### AI Routes (`/api/ai`)
- `POST /classify` - Classify video content
- `POST /suggest-keywords` - Get keyword suggestions

### Health Check
- `GET /health` - Server health status

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Extension Development
1. Make changes to extension files
2. Go to `chrome://extensions/`
3. Click the refresh icon on your extension
4. Test on YouTube

### Adding New Features
1. **Backend**: Add new routes in `backend/src/routes/`
2. **Extension**: Update content script in `extension/content/`
3. **UI**: Modify popup in `extension/popup/`

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5001
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
DATABASE_URL=mongodb://localhost:27017/flowtube
ALLOWED_ORIGINS=http://localhost:3000,chrome-extension://your-extension-id
```

## 📦 Dependencies

### Backend Dependencies
- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **helmet**: Security middleware
- **morgan**: HTTP request logger
- **dotenv**: Environment variable loader
- **axios**: HTTP client for API calls

### Extension Dependencies
- **Chrome Extension APIs**: Built-in browser APIs
- **No external dependencies**: Pure JavaScript

## 🚀 Deployment

### Backend Deployment
1. Set up production environment variables
2. Deploy to your preferred platform (Heroku, AWS, etc.)
3. Update CORS settings for production domain

### Extension Deployment
1. Package the extension folder
2. Submit to Chrome Web Store
3. Update manifest.json with production backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify backend server is running
3. Check environment variables are set correctly
4. Open an issue on GitHub

---

**Happy coding! 🎯**