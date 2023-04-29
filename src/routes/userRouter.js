const  Router  = require("express");
const userController = require("../controllers/userController");

const router = new Router()

router.get('/user', userController.getAllUsers)

router.post('/user/create', userController.newUser)

router.get('/product', userController.getAllProducts)
router.get('/product/:authorId', userController.getProductsId)
router.post('/product/create', userController.newProduct)
router.delete('/product/remove/:id', userController.deleteProduct)
router.put('/product/alterate/:id', userController.alterateProduct )


module.exports = router

 
