const prisma = require('../databases')

const getAllUsers = async (req,res) =>{
  const user = await prisma.user.findMany()
  return res.status(200).json(user)
}

const newUser = async (req,res) =>{
  const { email ,password, name } = req
  if(!email){
    return res.status(422).json({msg: 'O nome é obrigatório'})
  }
  if(!password){
    return res.status(422).json({msg: 'O nome é obrigatório'})
  }
  if(!name){
    return res.status(422).json({msg: 'O nome é obrigatório'})
  }
  
  const user = await prisma.user.create({
    data: {
      ...body
    }
  })
  return res.status(201).json(user)
}




module.exports = {
  getAllUsers,
  newUser,
}