const  Router  = require("express");
const userController = require("../controllers/userController");
const productController =  require("../controllers/productController");
const router = new Router()
const checkToken = require("../middleware/checkToken")


//listar todos os usuarios 
router.get('/user', userController.getAllUsers)

//registrar novo usuário
router.post('/user/register', userController.newUser)

//login do usuário
router.post('/user/login', userController.loginUser)

//deletar usuário
router.post('/user/delete/:id', userController.removeUser)

//Private Route
router.get('/user/:id', checkToken, userController.getUserId)


router.get('/product', productController.getAllProducts)
router.get('/product/:authorId', productController.getProductsId)
router.post('/product/create', productController.newProduct)
router.delete('/product/delete/:id', productController.deleteProduct)
router.put('/product/alterate/:id', productController.alterateProduct )


module.exports = router

 
