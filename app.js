const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db');
const path = require("path");
const blog = require('./routes/blogs');
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
dotenv.config();
const port = 3000;

app.use('/api', blog);

app.listen(port, () => {
  console.log(`Running at ${port}`);
});
