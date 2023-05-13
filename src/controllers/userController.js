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

const loginUser = async(req,res)=>{
  const {email,password} = req.body

  
  if(!email){
    return res.status(422).json({msg: 'O Email é obrigatório'})
  }
  if(!password){
    return res.status(422).json({msg: 'A Senha é obrigatório'})
  }

  const user = await prisma.user.findFirst({
    where:{
      email: email
    }
  })

  //checar senha 
  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword){
    return res.status(422).json({msg: "Senha Inválida"})
  }

  if(!user){
    return res.status(400).json({msg: "usuário não encontrado"})
  }

  try {
    const secret = process.env.SECRET

    const token = jwt.sign({
      id: user._id
    },secret,
    )

    res.status(200).json({msg: "Autenticação realizada com sucesso", token})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "Aconteceu um erro no servidor, tente novamente mais tarde"})
  }
}

const getUserId = async(req,res)=>{
  const {id} = req.params

  const user = await prisma.user.findFirst({
    where:{
      id: Number(id)
    }
  })
  if(!user){
    return res.status(404).json({msg: "usuário não encontrado"})
  }
  res.status(200).json({user})
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
  removeUser,
  loginUser,
  getUserId
}