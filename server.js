const express = require('express');
const dotenv = require('dotenv');
// third party logger we use it for logging requests in dev env
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
// load env vars from config file
dotenv.config({ path: './config/config.env' });

// connecting to database
connectDB();

// Route Files
const ideas = require('./routes/ideas');

const app = express();

// logging requests middleware in development env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers

app.use('/api/v1/ideas', ideas);

// catching errors after routing the request

app.use(errorHandler);

const PORT = procces.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections like not being able to connet to the database

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server & exit server with failure
  server.close(() => process.exit(1));
});
