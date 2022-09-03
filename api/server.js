const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const setup = require('./interfaces/initDataBase');

app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


setup();

app.listen(port, () => console.log(`Server started on port ${port}`));
