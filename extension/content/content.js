// FlowTube AI Content Script
// This script runs on YouTube pages to filter videos based on user criteria

class VideoFilter {
  constructor() {
    this.backendUrl = 'http://localhost:5001';
    this.filterKeywords = [];
    this.isFiltering = false;
    this.init();
  }

  async init() {
    console.log('🎯 FlowTube AI Content Script loaded');
    
    // Disable any existing styling when extension is first applied
    this.disableStyling();
    
    // Listen for messages from popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.handleMessage(request, sender, sendResponse);
      return true; // Keep message channel open for async response
    });

    // Load saved keywords from storage
    await this.loadSettings();
    
    // Start observing for new videos
    this.observeVideoContainer();
  }

  async handleMessage(request, sender, sendResponse) {
    switch (request.action) {
      case 'setKeywords':
        this.filterKeywords = request.keywords;
        await this.saveSettings();
        await this.filterVideos();
        sendResponse({ success: true });
        break;
        
      case 'getStatus':
        sendResponse({ 
          isFiltering: this.isFiltering,
          keywords: this.filterKeywords 
        });
        break;
        
      case 'toggleFiltering':
        this.isFiltering = !this.isFiltering;
        await this.saveSettings();
        if (this.isFiltering) {
          await this.filterVideos();
        } else {
          this.showAllVideos();
        }
        sendResponse({ isFiltering: this.isFiltering });
        break;
        
      case 'disableStyling':
        this.disableStyling();
        this.isFiltering = false;
        await this.saveSettings();
        sendResponse({ success: true });
        break;
    }
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get(['filterKeywords', 'isFiltering']);
      this.filterKeywords = result.filterKeywords || [];
      this.isFiltering = result.isFiltering || false;
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  async saveSettings() {
    try {
      await chrome.storage.local.set({
        filterKeywords: this.filterKeywords,
        isFiltering: this.isFiltering
      });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  observeVideoContainer() {
    const targetNode = document.querySelector('#contents');
    if (!targetNode) {
      console.log('Video container not found, retrying...');
      setTimeout(() => this.observeVideoContainer(), 1000);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      if (this.isFiltering) {
        this.filterVideos();
      }
    });

    observer.observe(targetNode, {
      childList: true,
      subtree: true
    });

    console.log('👀 Video container observer started');
  }

  async filterVideos() {
    if (!this.isFiltering || this.filterKeywords.length === 0) {
      return;
    }

    const videos = this.getVideoElements();
    console.log(`🔍 Filtering ${videos.length} videos with keywords:`, this.filterKeywords);

    for (const video of videos) {
      try {
        const shouldHide = await this.shouldHideVideo(video);
        if (shouldHide) {
          this.hideVideo(video);
        } else {
          this.showVideo(video);
        }
      } catch (error) {
        console.error('Error filtering video:', error);
      }
    }
  }

  getVideoElements() {
    return document.querySelectorAll('ytd-video-renderer, ytd-rich-item-renderer, ytd-compact-video-renderer');
  }

  async shouldHideVideo(videoElement) {
    const videoData = this.extractVideoData(videoElement);
    
    // Simple keyword matching (can be enhanced with AI)
    const title = videoData.title.toLowerCase();
    const description = videoData.description.toLowerCase();
    
    return this.filterKeywords.some(keyword => 
      title.includes(keyword.toLowerCase()) || 
      description.includes(keyword.toLowerCase())
    );
  }

  extractVideoData(videoElement) {
    const titleElement = videoElement.querySelector('#video-title, h3 a, h3 span');
    const descriptionElement = videoElement.querySelector('#description-text, .ytd-video-meta-block');
    
    return {
      title: titleElement?.textContent?.trim() || '',
      description: descriptionElement?.textContent?.trim() || '',
      url: titleElement?.href || '',
      thumbnail: videoElement.querySelector('img')?.src || ''
    };
  }

  hideVideo(videoElement) {
    videoElement.style.display = 'none';
    videoElement.setAttribute('data-flowtube-hidden', 'true');
  }

  showVideo(videoElement) {
    videoElement.style.display = '';
    videoElement.removeAttribute('data-flowtube-hidden');
  }

  showAllVideos() {
    const hiddenVideos = document.querySelectorAll('[data-flowtube-hidden="true"]');
    hiddenVideos.forEach(video => this.showVideo(video));
  }

  disableStyling() {
    // Remove any existing FlowTube styling
    const existingBanner = document.querySelector('[data-flowtube-banner]');
    if (existingBanner) {
      existingBanner.remove();
    }

    // Reset any modified body styles
    if (document.body.style.backgroundColor === 'pink') {
      document.body.style.backgroundColor = '';
    }

    // Show all previously hidden videos
    this.showAllVideos();

    // Remove any FlowTube CSS classes or attributes
    const elementsWithFlowTube = document.querySelectorAll('[data-flowtube-hidden]');
    elementsWithFlowTube.forEach(element => {
      element.removeAttribute('data-flowtube-hidden');
      element.style.display = '';
    });

    console.log('🚫 FlowTube styling disabled');
  }
}

// Initialize the video filter
new VideoFilter();