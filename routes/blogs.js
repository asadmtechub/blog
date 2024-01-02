const express = require('express');
const router = express.Router();
const { save, get, blogDelete, update } = require('../controllers/blogs');
const imageUploadMiddleware = require('../middleware/imageMiddleware');

router.post('/blog', imageUploadMiddleware, save);
router.put('/blog/:id', update);
router.get('/blog', get);
router.get('/blog/:id', get);
router.delete('/blog/:id', blogDelete);

module.exports = router;
