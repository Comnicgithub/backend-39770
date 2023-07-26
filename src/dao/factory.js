const { config: { persistence } } = require("../config/config");

let ProductDao
let CartDao
let UserDao

switch (persistence) {
    case 'MONGO':
        ProductDao = require('../dao/mongo/product.mongo.js')
        CartDao    = require('../dao/mongo/cart.mongo.js').default
        UserDao    = require('../dao/mongo/user.mongo.js')

        break;
    case 'MEMORY':
        // CartDao = require('../dao/Memoria/cart.memory.js')
        // UserDao = require('../dao/Memoria/user.memory.js')
        // ProductDao = require('../dao/Memoria/product.memory.js')
        break;
    case 'FILE':
        // CartDao = require('../dao/File/cart.file.js')
        // UserDao = require('../dao/File/user.file.js')
        // ProductDao = require('../dao/File/product.file.js')        
        break;

    
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao
}