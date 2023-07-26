import ProductDaoMongo from '../dao/Mongo/product.mongo.js'
import ProductRepository from '../repositories/product.repositories.js'
// const UserDaoMongo = require('../dao/Mongo/User.mongo.js')
// const CartDaoMongo = require('../dao/Mongo/Cart.mongo.js')

// este archivo es ideal para aplicar el patron repository

const productService = new ProductRepository(new ProductDaoMongo())
// const productService = new ProductDaoMemory()
// const userService = new UserDaoMongo()
// const cartService = new CartDaoMongo()

export default {
    productService,
    // userService,
    // cartService,
}