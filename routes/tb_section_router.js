const controller = require('../controller/tb_section_controller');
const express = require('express');
const router = express.Router();


router.get('/',controller.index);
router.post('/',controller.insert);
router.get('/search',controller.find);
router.delete('/',controller.delete);
router.put('/',controller.update);

module.exports=router;