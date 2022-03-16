const controller = require('../controller/tb_publication.controller');
const express = require('express');
const router = express.Router();

router.post('/',controller.insert);
router.put('/:id',controller.update);
router.delete('/:id',controller.delete);
router.get('/la',controller.index_la);
router.get('/en',controller.index_en);


module.exports=router;