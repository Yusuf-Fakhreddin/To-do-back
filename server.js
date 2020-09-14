const express = require('express');
const dotenv = require('dotenv');

// load env vars from config file

dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = procces.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
