const controller = require('../controller/tb_user.controller');
const express = require('express');
const router = express.Router();


router.get('/', controller.index);
router.post('/', controller.insert);
router.get('/search', controller.search);
router.delete('/:id',controller.delete);
router.put('/:id',controller.update);

module.exports=router;