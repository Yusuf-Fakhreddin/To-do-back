const express = require('express');
const dotenv = require('dotenv');
// third party logger we use it for logging requests in dev env
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
// load env vars from config file
dotenv.config({ path: './config/config.env' });

// connecting to database
connectDB();

// Route Files
const ideas = require('./routes/ideas');
const auth = require('./routes/auth');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// logging requests middleware in development env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/ideas', ideas);
app.use('/api/v1/auth', auth);

// catching errors after routing the request

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections like not being able to connet to the database

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server & exit server with failure
  server.close(() => process.exit(1));
});
