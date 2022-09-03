const { app } = require('express');
const express = require('express');
const router = express.Router();
const {accessToken,refreshToken} = require('../controllers/tokenController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', accessToken);

module.exports = router;