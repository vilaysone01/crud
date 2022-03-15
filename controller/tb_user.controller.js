const model = require('../models/index');
const bcrep = require('bcryptjs');

exports.index = async (req, res, next) => {
    const user = await model.tb_user.findAll({
        include: ['tb_role', 'tb_sections']
    });

    res.status(200).json({
        data: user
    });
}


// insert
exports.insert = async (req, res, next) => {
    const {
        f_name,
        l_name,
        email,
        password,
        role_id,
        section_id
    } = req.body;
    // chaeck email
    const exitMail = await model.tb_user.findOne({where:{email:email}});
    if(exitMail){
        res.status(200).json({
            message:'the same mail!'
        })
    }else{
        //hash password
        const salt = await bcrep.genSalt(10);
        const passwordHash = await bcrep.hash(password, salt);


        const user = await model.tb_user.create({
            f_name: f_name,
            l_name: l_name,
            email: email,
            password: passwordHash,
            role_id: role_id,
            section_id: section_id

        })

        res.status(201).json({
            data: {
                id: user.id,
                email: user.email,
                password: user.password,
                section_id: user.section_id
            }
        });
    }
    

}

// find by name
exports.search= async (req, res, next)=>{
    const {id} = req.body;
     if(!id){
        res.status(400).json({
            message:'not found id'
        });
     }else{
        const findName = await model.tb_user.findOne({where:{id:id},
            include: ['tb_role', 'tb_sections']
         });
    
        res.status(200).json({
            data:findName
        })
     }


}

// delete data
exports.delete= async (req, res, next)=>{
    const {id} = req.params;
    if(!id){
        res.status(400).json({
            message:'not found id'
        });
    }else{
        const findID = await model.tb_user.destroy({where:{id:id}});
        res.status(200).json({
           data:{  
               message:'deleted',
               data:user.id,
               name:user.name
   
           }
       })
    }
   


}

// UPDATE

exports.update=async(req,res, next)=>{
    const {
        
        f_name,
        l_name,
        email,
        password,
        role_id,
        section_id
    } = req.body;
    const {id} = req.params;
    if(!id){
        res.status(400).json({
            message:'not found id'
        });
    }else{
   
        //hash password
        const salt = await bcrep.genSalt(10);
        const passwordHash = await bcrep.hash(password, salt);


        const user = await model.tb_user.update({
            f_name: f_name,
            l_name: l_name,
            email: email,
            password: passwordHash,
            role_id: role_id,
            section_id: section_id

        },{
            where:{id:id}
        })

        res.status(200).json({
            data: {
                id: user.id,
                email: user.email,
                password: user.password,
                section_id: user.section_id
            }
        });
    }}

