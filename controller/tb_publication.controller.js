
const base64 = require('base64topdf');
const formidable = require('formidable');
const model = require('../models/index');


exports.insert= async (req, res, next)=>{
//     const form = new formidable.IncomingForm();
//     form.parse(req, async(error, fields, files)=>{
//         const la = files.laoContent;
//        // let encodedPdf = base64.base64Encode(la);

//         //  const pub = await model.tb_plublication.create({
//         //  })
        
// res.status(200).json({
//     no:fields.no,
//     data:la
// })   
//     })

try {
    const {no, laoContent, engContent} = req.body;
const pub = await model.tb_plublication.create({
no:no,
laoContent:laoContent,
engContent:engContent
});
res.status(201).json({
    data:pub,
    message:'data saved!'
})
} catch (error) {
    res.status(400).json({
        error:true,
        message:'can not save data'
    })  
}

}

// show data
exports.index= async(req, res)=>{
   const pub = await model.tb_plublication.findAll();

  try {
    res.status(200).json({
        
        data:pub,
        
    })
  } catch (error) {
      res.status(400).json({
          error:true,
          message:error.message
      })
  }
}

// detele
exports.delete = async(req, res) =>{
    try {
        const {id} = req.params;

   if(!id){
    res.status(400).json({
        error:true,
        message:'Not found ID!',
        data:null
    })
   }else{
    const pub = await model.tb_plublication.destroy({
        where:{id:id}
    });

    res.status(200).json({
        data:pub,
        message:'data updated!'
    })
   }
    } catch (error) {
        res.status(400).json({
            data:error
        })
    }
}

// update

exports.update =async (req, res)=>{
    try {
        const {id} = req.params;
        const {no, laoContent,engContent} = req.body;
    if(!id){
        
        res.status(400).json({
            error:true,
            message:'Not found ID!'
        })
    }else{
        const pub = await model.tb_plublication.update({
            no:no,
            laoContent:laoContent,
            engContent:engContent
        }, {where:{id:id}})
    
        res.status(200).json({
            data:pub,
            message:'data updated!'
        });
    }
    } catch (error) {
        console.log(error)
    }

}


