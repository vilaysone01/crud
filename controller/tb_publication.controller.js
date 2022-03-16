const models = require('../models/index');
const formidable = require('formidable');
const upload = require('./function/myFunc');
const fs = require('fs-extra');


exports.insert= async (req, res, next)=>{
   try {
    const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        const result = await models.tb_plublication.create({
            no: fields.no,
            lao_topic: fields.lao_topic,
            lao_Content: fields.lao_Content,
            eng_Content: fields.eng_Content,
            eng_topic: fields.eng_topic
        }, { logging: false })
        _path = "/pub"
        _lao_Content = await upload.uploadFile(files.lao_Content, result.lao_Content, result.id, _path, "la");
        console.log(_lao_Content)
        _eng_Content= await upload.uploadFile(files.eng_Content, result.eng_Content, result.id, _path, "en");

        await models.tb_plublication.update({
            lao_Content: _lao_Content,
            eng_Content: _eng_Content,
        }, { where: { id: result.id }, logging: false });

        return res.status(201).json({ message: "success" })
    })
   } catch (error) {
       res.status(500).json({
           error:error.message
       })
   }
}
   
      


// show data lao content
exports.index_la= async(req, res)=>{
    const pub_la = await models.tb_plublication.findAll({
        attributes:['lao_topic','lao_Content','createdAt']
    })
    res.json({
        data:pub_la
    })
}
// show data eng content
exports.index_en= async(req, res)=>{
    const pub_en = await models.tb_plublication.findAll({
        attributes:['eng_topic','eng_Content','createdAt']
    })
    res.json({
        data:pub_en
    })
}

// update
exports.update = async (req, res)=>{
    try {
        const {id} = req.params;
    const pub = await models.tb_plublication.findByPk(id);
    if(!pub){
        res.status(404).json({
            message:"Not Found!"
        })
    }else{
        const form = new formidable.IncomingForm()
    form.parse(req, async (error, fields, files) => {
        const result = await models.tb_plublication.update({
            no: fields.no,
            lao_topic: fields.lao_topic,
            lao_Content: fields.lao_Content,
            eng_Content: fields.eng_Content,
            eng_topic: fields.eng_topic
        }, { where:{id:id},logging: false })
        _path = "/pub"
        _lao_Content = await upload.uploadFile(files.lao_Content, result.lao_Content, id, _path, "la");
        _eng_Content= await upload.uploadFile(files.eng_Content, result.eng_Content, id, _path, "en");

        await models.tb_plublication.update({
            lao_Content: _lao_Content,
            eng_Content: _eng_Content,
        }, { where: { id:id }, logging: false });

        return res.status(200).json({ message: "updated" })
    })
    }
    } catch (error) {
        res.status(400).json({
            error:error.message,
           
        })
        
    }
}

// delete
exports.delete = async (req, res)=>{
    try {
        const {id} = req.params;
    const pub = await models.tb_plublication.findByPk(id);
    if(!id){
        res.status(404).json({
            message:'not Found ID!'
        })
    }else{
        const result = await models.tb_plublication.findOne({where:{id}});
        _path="public/images/pub/"
        upload.deleteFile(_path, result.lao_Content)
        upload.deleteFile(_path, result.eng_Content)
        await models.tb_plublication.destroy({where:{id:id}, logging:false});
        res.status(200).json({
            message:"deleted success"
        })
    }
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}




