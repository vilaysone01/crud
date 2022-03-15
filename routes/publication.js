const controller = require('../controller/tb_publication.controller');
const express = require('express');
const router = express.Router();

router.post('/',controller.insert);
router.get('/',controller.index);
router.delete('/;id',controller.delete);
router.put('/:id',controller.update);

module.exports=router;