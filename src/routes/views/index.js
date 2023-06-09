import { Router } from "express"
import { ProductsArrayConvert } from "../../devUtils.js"
import Products from '../../models/prodcuct.model.js'
import path from 'path'


const router = Router()

router.get('/', async (req, res, next) => {
    try {
      const filePath = path.resolve('./public/index.html');
res.sendFile(filePath);
    } catch (error) {
      console.log(error);
      next();
    }
  });
router.get('/products', async (req, res, next) => {
    try {
      const all = await Products.find();
      const prodsClone = JSON.parse(JSON.stringify(all));
      const products = ProductsArrayConvert(prodsClone);
      console.log(products)
      const filePath = path.resolve('./public/pages/tienda.html');
res.sendFile(filePath);
    } catch (error) {
      console.log(error);
      next();
    }
  });

router.get('/contact', async (req, res, next) => {
    try {
      const filePath = path.resolve('./public/pages/contacto.html');
res.sendFile(filePath);
    } catch (error) {
      console.log(error);
      next();
    }
  });
router.get('/marcas', async (req, res, next) => {
    try {
      const filePath = path.resolve('./public/pages/marcas.html');
res.sendFile(filePath);
    } catch (error) {
      console.log(error);
      next();
    }
  });

router.get('/chat', async (req, res, next) => {
    try {
      const filePath = path.resolve('./public/pages/chat.html');
res.sendFile(filePath);
    } catch (error) {
      console.log(error);
      next();
    }
  });

router.get('/nosotros', async (req, res, next) => {
    try {
      const filePath = path.resolve('./public/pages/nosotros.html');
res.sendFile(filePath);
    } catch (error) {
      console.log(error);
      next();
    }
  });
  
  router.get('/new_product', async (req, res, next) => {
    try {
      return res.render('new_product', {
        title: 'new_product',
        title: 'Product',
        conection: '/public/conection.js',
      });
    } catch (error) {
      next();
    }
  });

router.get("/products/:pid", async (req, res, next) => {
    try {
        return res.render("view_product", {
            script2: '/public/uniqueProduct.js',
            topTitle: "prueba",
            conection: '/public/conection.js'
        })
    } catch(error) {

    }
})


router.get(
    '/carts',
    async(req,res,next) => {
        try {
            
            return res.render('carts', {
                name: 'Nico',
                last_name: 'Lopez',
                photo: 'https://www.w3schools.com/howto/img_avatar.png',
                script: "public/cart.js",
                conection: '/public/conection.js'
            })
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/chat',
    async(req,res,next) => {
        try {
            return res.render('chat', {
                title: 'Chat bot',
                conection: '/public/conection.js',
                script2: "public/chatbot.js"
            })
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/form',
    async(req,res,next) => {
        try {
            return res.render(
                'form',
                { title: 'Form',
                conection: '/public/conection.js' }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/register',
    async(req,res,next) => {
        try {
            return res.render(
                'register',
                { title: 'Register', 
                conection: '/public/conection.js'}
            )
        } catch (error) {
            next()
        }
    }
)



export default router
