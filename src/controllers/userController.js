const prisma = require('../databases')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req,res) =>{
  const user = await prisma.user.findMany()
  return res.status(200).json(user)
}

const newUser = async (req,res) =>{
  const { email ,password, name } = req.body

  //verificando se o usuario existe

  const userExists = await prisma.user.findFirst({
    where:{
      email: email
    }
  })

  if(userExists){
    return res.status(422).json({msg: "Email já exsite, utilize outro"})
  }

  //create password

  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  if(!email){
    return res.status(422).json({msg: 'O Email é obrigatório'})
  }
  if(!password){
    return res.status(422).json({msg: 'A Senha é obrigatório'})
  }
  if(!name){
    return res.status(422).json({msg: 'O nome é obrigatório'})
  }
  
  const user = await prisma.user.create({
    data: {
      email: email,
      password: passwordHash,
      name: name
    }
  })

  try {
    res.status(201).json({msg: "Usuário criado com sucesso"})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde"})
  }
}

const removeUser = async(req, res) =>{
  const {id} = req.params
  const user = await prisma.user.delete({
    where:{
      id: Number(id)
    }
  })
}

module.exports = {
  getAllUsers,
  newUser,
  removeUser
}