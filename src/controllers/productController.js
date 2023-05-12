const prisma = require('../databases')

const getAllProducts = async (req,res) =>{
  const products = await prisma.product.findMany()
  return res.status(200).json(products)
}

const getProductsId = async (req,res) =>{
  const authorId = Number(req.params.authorId)
  const product = await prisma.product.findMany({
    where: {
      authorId: authorId
    } 
  })
  return res.status(200).json(product)
}

const newProduct = async (req,res) =>{
  const { body } = req
  const product = await prisma.product.create({
    data: {
      ...body,
      author:{
        connect:{
          id: 2
        }
      }
    }
  })
  return res.status(201).json(product)
}

const deleteProduct = async(req,res) =>{
  const {id} = req.params
  const product = await prisma.product.delete({
    where:{
      id: Number(id)
    }
  })
  console.log(id);
  return res.status(202).json({msg:"O produto foi deletado"})
}

const alterateProduct = async(req,res) =>{
  const { id } = req.params
  const { body } = req
  const product = await prisma.product.update({
    where:{
      id: Number(id)
    },
    data:{
      ...body
    }
  })
  return res.status(200).json({msg:"Produto alterado"})
} 

module.exports = {
  newProduct,
  getAllProducts,
  getProductsId,
  deleteProduct,
  alterateProduct
}