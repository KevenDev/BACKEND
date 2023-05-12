const  Router  = require("express");
const userController = require("../controllers/userController");
const productController =  require("../controllers/productController");
const router = new Router()


//listar todos os usuarios 
router.get('/user', userController.getAllUsers)

//registrar novo usuário
router.post('/user/register', userController.newUser)

//deletar usuário
router.post('/user/delete/:id', userController.removeUser)

router.get('/product', productController.getAllProducts)
router.get('/product/:authorId', productController.getProductsId)
router.post('/product/create', productController.newProduct)
router.delete('/product/delete/:id', productController.deleteProduct)
router.put('/product/alterate/:id', productController.alterateProduct )


module.exports = router

 
