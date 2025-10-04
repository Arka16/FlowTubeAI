// AI Service for video content analysis
// This module handles communication with AI services like OpenAI

class AIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY;
    this.baseUrl = 'https://api.openai.com/v1';
  }

  async analyzeVideoContent(videoData) {
    try {
      // TODO: Implement actual AI analysis
      // This would typically involve:
      // 1. Extracting video metadata (title, description, tags)
      // 2. Sending to OpenAI API for content analysis
      // 3. Getting classification results
      
      const prompt = this.buildAnalysisPrompt(videoData);
      
      // Placeholder response - replace with actual API call
      return {
        isDistracting: Math.random() > 0.5,
        confidence: Math.random(),
        categories: ['entertainment', 'educational'],
        reasoning: 'AI analysis placeholder',
        keywords: this.extractKeywords(videoData)
      };
    } catch (error) {
      console.error('AI analysis error:', error);
      throw new Error('Failed to analyze video content');
    }
  }

  buildAnalysisPrompt(videoData) {
    return `
      Analyze this YouTube video and determine if it's distracting based on productivity:
      
      Title: ${videoData.title}
      Description: ${videoData.description}
      
      Return JSON with:
      - isDistracting: boolean
      - confidence: number (0-1)
      - categories: array of strings
      - reasoning: string
    `;
  }

  extractKeywords(videoData) {
    // Simple keyword extraction - can be enhanced
    const text = `${videoData.title} ${videoData.description}`.toLowerCase();
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    return text
      .split(/\W+/)
      .filter(word => word.length > 3 && !commonWords.includes(word))
      .slice(0, 10);
  }

  async suggestKeywords(task, context) {
    try {
      // TODO: Implement AI-powered keyword suggestion
      const prompt = `
        Suggest keywords to filter out distracting YouTube videos for someone working on: ${task}
        Context: ${context}
        
        Return a JSON array of keywords.
      `;
      
      // Placeholder response
      return [
        'gaming',
        'entertainment',
        'viral',
        'trending',
        'comedy',
        'music videos',
        'reaction videos'
      ];
    } catch (error) {
      console.error('Keyword suggestion error:', error);
      throw new Error('Failed to suggest keywords');
    }
  }
}

module.exports = new AIService();
