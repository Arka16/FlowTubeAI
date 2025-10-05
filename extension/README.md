# FlowTube AI Extension

## How to Load the Extension

1. **Open Chrome Extensions Page:**
   - Go to `chrome://extensions/`
   - Or: Chrome Menu → More Tools → Extensions

2. **Enable Developer Mode:**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension:**
   - Click "Load unpacked"
   - Navigate to this folder (`/Users/arkapal/FlowTubeAI/extension`)
   - Select the folder and click "Select Folder"

4. **Verify Installation:**
   - The extension should appear in your extensions list
   - You should see "Flow tube AI" with version 1.0

## Testing the Extension

1. **Go to YouTube:**
   - Navigate to `https://www.youtube.com`
   - The extension should load automatically

2. **Open the Extension:**
   - Click the extension icon in the Chrome toolbar
   - You should see the popup with input field and buttons

3. **Test Features:**
   - Enter keywords to filter videos
   - Click "Hide Videos" to test filtering
   - Use "Toggle Filtering" to enable/disable
   - Use "Disable All Styling" to reset

## Troubleshooting

### If the extension won't load:
- Make sure you're selecting the `extension` folder (not the parent FlowTubeAI folder)
- Check that all files are present (manifest.json, popup/, content/, background/)
- Try refreshing the extensions page

### If you get errors:
- Check the browser console for error messages
- Make sure you're on a YouTube page when testing
- Verify the extension is enabled in the extensions page

## File Structure
```
extension/
├── manifest.json          # Extension configuration
├── popup/                 # Popup UI
│   ├── popup.html        # Popup HTML
│   └── popup.js          # Popup JavaScript
├── content/              # Content Scripts
│   └── content.js        # YouTube page script
├── background/           # Background Scripts
│   └── background.js     # Service worker
└── README.md            # This file
```
