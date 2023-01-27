const trackmodel = require('../model/trackmodel')
const validation =require('../validation/validator')

const createtrack = async function (req,res){

    try {
        
    let data = req.body
    let{name,artistId,duration} = data
    
    if(!name) return res.status(400).send({status:false,message:'name is required'})
    if(!validation.isValid(name)) return res.status(400).send({status:false,msg:"name is required or its should contain aplhabets"})

    if(!duration) return res.status(400).send({status:false,message:'duration is required'})
   


    if(Object.keys(data).length == 0)
    return res.status(400).send({status:false,message:"data is required"})

    const create = await trackmodel.create(data)
    return res.status(200).send({status:true,data:create})
        
    } catch (error) {
      return res.status(500).send({status:false,message:error.msg})
    }
}

const gettrack = async function (req,res){
    try {

    let data = req.query
    let{name,artistId,duration} =data

    const user = await trackmodel.find({...data})
    if(user.length==0){
        return res.status(404).send({status:false,msg:"data not found"})
    }
    return res.status(200).send({status:true,message:"find data successfully", data:user})
    
        
    } catch (error) {
      return res.status(500).send({status:false,message:error.msg})
    }
}

const singletrack = async function (req,res){

     try{

    let gets = req.params.id

    if(!validation.isValidObjectId(gets)) 
    return res.status(400).send({status:false,message:"userid is invalid"})

    const getuser = await trackmodel.findOne({_id:gets,isDeleted:false})
    if(!getuser){
        return res.status(404).send({status:false,message:"user not found"})
    }
    //console.log(getuser)
    return  res.status(200).send({status:true,message:"user profile details",data:getuser})
    
} catch (error) {
    return res.status(500).send({status:false,message:error.msg})
  }

}


const updatetrack = async function(req,res){

   try {

    let data = req.body
    let userid = req.params.id
    let {name,artistId,duration}= data

    if(!validation.isValidObjectId(userid)){
        return res.status(400).send({status:false,message:'userid is ivalid'})
    }
    
    const exist = await trackmodel.findOne({_id:userid,isDeleted:false})
    if(!exist){
        return res.status(400).send({status:false,msg:"userid does not exist"})
    }

    let update = await trackmodel.findOneAndUpdate({_id:userid},{$set:{name:name,artistId,duration}},{new:true})
    if(!update){
        return res.status(404).send({status:false,msg:"user not found"})
    }
    return res.status(200).send({status:true,message:"successfully upadate",data:update})
    
   } catch (error) {
    return res.status(500).send({status:false,message:error.msg})
   }
}

const deletetrack = async function  (req,res){

    try {

        const userid = req.params.id

    if(!validation.isValidObjectId(userid)) return res.status(400).send({status:false,message:"userid is invalid"})

    let detail = await trackmodel.findByIdAndUpdate({_id:userid},{$set:{isDeleted:true}},{new:true})

    if(!detail){
        return res.status(404).send({status:false,message:'user does not exist'})
    }
    return res.status(200).send({status:false,message:"deleted successfully",data:detail})
        
    } catch (error) {
      return res.status(500).send({status:false,message:error.msg})
    }

}

module.exports ={createtrack,gettrack,singletrack,updatetrack,deletetrack}