const controller = require('../controller/tb_section_controller');
const express = require('express');
const router = express.Router();


router.get('/',controller.index);
router.post('/',controller.insert);
router.delete('/:id',controller.delete);
router.put('/:id',controller.update);

module.exports=router;