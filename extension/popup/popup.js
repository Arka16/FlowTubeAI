// FlowTube AI Popup Script
// Handles popup UI interactions and communication with content script

class PopupController {
  constructor() {
    this.keywordInput = document.getElementById('keywordInput');
    this.hideBtn = document.getElementById('hideBtn');
    this.status = document.getElementById('status');
    this.toggleBtn = document.getElementById('toggleBtn');
    
    this.init();
  }

  async init() {
    console.log('🎯 FlowTube AI Popup loaded');
    
    // Load current status
    await this.loadStatus();
    
    // Set up event listeners
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.hideBtn.addEventListener('click', () => this.hideVideos());
    this.keywordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.hideVideos();
      }
    });

    // Add toggle button if it exists
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener('click', () => this.toggleFiltering());
    }
  }

  async loadStatus() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url.includes('youtube.com')) {
        const response = await chrome.tabs.sendMessage(tab.id, { action: 'getStatus' });
        
        if (response) {
          this.updateUI(response);
        }
      } else {
        this.showStatus('Please navigate to YouTube to use this extension', 'error');
      }
    } catch (error) {
      console.error('Failed to load status:', error);
      this.showStatus('Failed to connect to YouTube page', 'error');
    }
  }

  updateUI(status) {
    if (status.isFiltering) {
      this.hideBtn.textContent = 'Stop Filtering';
      this.hideBtn.style.background = '#e53e3e';
    } else {
      this.hideBtn.textContent = 'Hide Videos';
      this.hideBtn.style.background = '#667eea';
    }

    if (status.keywords && status.keywords.length > 0) {
      this.keywordInput.value = status.keywords.join(', ');
    }
  }

  async hideVideos() {
    const keywords = this.keywordInput.value.trim();
    
    if (!keywords) {
      this.showStatus('Please enter keywords to hide videos', 'error');
      return;
    }

    try {
      const keywordList = keywords.split(',').map(k => k.trim()).filter(k => k);
      
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url.includes('youtube.com')) {
        await chrome.tabs.sendMessage(tab.id, {
          action: 'setKeywords',
          keywords: keywordList
        });
        
        this.showStatus(`Hiding videos with keywords: "${keywords}"`, 'success');
      } else {
        this.showStatus('Please navigate to YouTube to use this extension', 'error');
      }
    } catch (error) {
      console.error('Error hiding videos:', error);
      this.showStatus('Failed to hide videos', 'error');
    }
  }

  async toggleFiltering() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url.includes('youtube.com')) {
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: 'toggleFiltering'
        });
        
        if (response) {
          this.updateUI({ isFiltering: response.isFiltering });
          const message = response.isFiltering ? 'Filtering enabled' : 'Filtering disabled';
          this.showStatus(message, 'success');
        }
      }
    } catch (error) {
      console.error('Error toggling filtering:', error);
      this.showStatus('Failed to toggle filtering', 'error');
    }
  }

  showStatus(message, type = 'info') {
    this.status.textContent = message;
    this.status.className = `status ${type}`;
    this.status.style.display = 'block';
    
    // Hide status after 3 seconds
    setTimeout(() => {
      this.status.style.display = 'none';
    }, 3000);
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});