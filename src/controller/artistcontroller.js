const artistmodel = require('../model/artistmodel')
const validation = require('../validation/validator')


const createuser = async function (req,res){

   try {

    let data = req.body 

    let {name} = data

    if(!name) return res.status(400).send({status:false,message:'name is required'})
   

    if(Object.keys(data).length == 0) 
    return res.status(400).send({status:false,message:"please provide data"})

    const createdata = await artistmodel.create(data)
    return res.status(201).send({status:true,message:createdata})
    
   } catch (error) {
     return res.status(500).send({status:false,message:error.msg})
   }
} 



const alluser = async function(req,res){
     try {
        
        let data = req.query
     let {name,grammy} = data

     const get = await artistmodel.find({...data})

     if(get.length==0){
        return res.status(404).send({status:false,msg:'data not found'})
     }
     return res.status(200).send({status:true,message:'found data succesfully',data:get})
     
     } catch (error) {
        return res.status(500).send({status:false,message:error.msg})
     }
}

const singleuser = async function (req,res){
   try {
    
    let getparam = req.params.id

    if(!validation.isValidObjectId(getparam)) 
    return res.status(400).send({status:false,message:"userid is invalid"})

   
    const getuser = await artistmodel.findOne({_id:getparam ,isDeleted:false})
    if(!getuser){
        return res.status(404).send({status:false,message:"user not found"})
    }
    return  res.status(200).send({status:true,message:"user profile details",data:getuser})
   } catch (error) {
    return res.status(500).send({status:false,message:error.msg})
   }

     

}

const updateuser = async function(req,res){
    try {
        
    let data = req.body
    let userid = req.params.id
    let {name,grammy}= data

    if(Object.keys(data).length ==0) return res.status(400).send({status:false,msg:"please provide data"})

    if(!validation.isValidObjectId(userid)){
        return res.status(400).send({status:false,message:'userid is ivalid'})
    }

    let exist = await artistmodel.findOne({_id:userid,isDeleted:false})
    if(!exist){
        return res.status(400).send({status:false,msg:"userid does not exist"})
    }

    let update = await artistmodel.findOneAndUpdate({_id:userid},{$set:{name:name,grammy:grammy}},{new:true})
    if(!update){
        return res.status(404).send({status:false,msg:"user not founded"})
    }
    return res.status(200).send({status:true,message:"successfully upadate",data:update})
    } catch (error) {
      return res.status(500).send({status:false,message:error.msg})
    }

}


    const deletes = async function (req,res){
      try {
        
        let userid = req.params.id

        let exist = await artistmodel.findOne({_id:userid,isDeleted:false})
        if(!exist){
           return res.status(204).send({status:false,message:"artist is  founded but allready deleted"})
        }
   
        let  details = await artistmodel.findByIdAndUpdate({_id:userid},{$set:{isDeleted:true}},{new:true})
   
       if(!details){
           return res.status(404).send({status:false,message:'user does not exist'})
       }
       return res.status(200).send({status:false,message:"deleted successfully",data:details})
       
      } catch (error) {
        return res.status(500).send({status:false,message:error.msg})
      }
   }
   

module.exports = {createuser,singleuser,alluser,updateuser,deletes}