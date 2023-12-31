require('dotenv').config();

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_SECRET = process.env.PROD === 'production' ? process.env.JWT_SECRET : 'dev-secret';

const mongooseOptions = {
  useNewUrlParser: true,
};

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://movies.rockelic.nomoreparties.co',
    'https://movies.rockelic.nomoreparties.co',
  ],
  credentials: true,
};

module.exports = {
  PORT,
  MONGODB_URI,
  JWT_SECRET,
  mongooseOptions,
  corsOptions,
};
