// Database configuration and connection
// This module handles database setup and connections

const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      const mongoUri = process.env.DATABASE_URL || 'mongodb://localhost:27017/flowtube';
      
      this.connection = await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('📊 Database connected successfully');
      return this.connection;
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.disconnect();
        console.log('📊 Database disconnected');
      }
    } catch (error) {
      console.error('Database disconnection error:', error);
    }
  }

  getConnection() {
    return this.connection;
  }
}

module.exports = new Database();
