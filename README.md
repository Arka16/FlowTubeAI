# FlowTube AI Chrome Extension

A Chrome extension that hides YouTube videos to help you stay focused and avoid distractions.

## Features

- **Hide Videos**: Completely hide all videos on any webpage
- **Show Videos**: Restore videos when you want to watch them
- **YouTube Support**: Specifically targets YouTube's video player elements
- **Universal**: Works on any website with video content

## Installation

1. **Download/Clone** this repository
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. **Click "Load unpacked"**
5. **Select this directory** containing the extension files

## Usage

1. **Navigate** to any webpage with videos (like YouTube)
2. **Click the FlowTube AI extension icon** in your browser toolbar
3. **Click "Hide Videos"** to make all videos invisible
4. **Click "Show Videos"** to restore normal video display

## Files

- `manifest.json` - Extension configuration
- `popup.html` - Extension popup interface
- `popup.js` - Popup functionality
- `content.js` - Video hiding logic
- `background.js` - Background script

## Requirements

- Chrome browser
- No additional dependencies

## Notes

- Works on YouTube and other video sites
- State persists until you manually show videos again
- Extension requires permission to access all websites

## Troubleshooting

If videos don't hide:
1. Refresh the webpage
2. Reload the extension
3. Check browser console for errors
4. Ensure extension has proper permissions
