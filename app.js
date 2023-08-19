require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookies = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const {
  PORT, MONGODB_URI, mongooseOptions, corsOptions,
} = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);
app.use(cookies());
app.use(express.json());
app.use(requestLogger);

mongoose.connect(MONGODB_URI, mongooseOptions);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
