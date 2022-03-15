const controller = require('../controller/tb_role_controller');
const express = require('express');
const router = express.Router();


router.get('/',controller.index);
router.post('/',controller.insert);
router.get('/search',controller.find);
router.delete('/:id',controller.delete);
router.put('/:id',controller.update);

module.exports=router;