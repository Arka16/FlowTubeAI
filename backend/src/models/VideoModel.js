// Video data model and validation
// This module handles video data structure and validation

class VideoModel {
  constructor(data) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.url = data.url || '';
    this.thumbnail = data.thumbnail || '';
    this.duration = data.duration || '';
    this.channel = data.channel || '';
    this.views = data.views || 0;
    this.publishedAt = data.publishedAt || null;
    this.tags = data.tags || [];
  }

  validate() {
    const errors = [];
    
    if (!this.id) errors.push('Video ID is required');
    if (!this.title) errors.push('Video title is required');
    if (!this.url) errors.push('Video URL is required');
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      url: this.url,
      thumbnail: this.thumbnail,
      duration: this.duration,
      channel: this.channel,
      views: this.views,
      publishedAt: this.publishedAt,
      tags: this.tags
    };
  }

  static fromYouTubeData(youtubeData) {
    return new VideoModel({
      id: youtubeData.id?.videoId || youtubeData.id,
      title: youtubeData.snippet?.title || '',
      description: youtubeData.snippet?.description || '',
      url: `https://www.youtube.com/watch?v=${youtubeData.id?.videoId || youtubeData.id}`,
      thumbnail: youtubeData.snippet?.thumbnails?.high?.url || '',
      duration: youtubeData.contentDetails?.duration || '',
      channel: youtubeData.snippet?.channelTitle || '',
      publishedAt: youtubeData.snippet?.publishedAt || null,
      tags: youtubeData.snippet?.tags || []
    });
  }
}

module.exports = VideoModel;
