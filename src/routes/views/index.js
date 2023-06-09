import { Router } from "express"
import Products from '../../models/prodcuct.model.js'
import path from 'path'
import fs from 'fs'


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


  router.get("/products", async (req, res, next) => {
    try {
      const all = await Products.find();
      if (all.length === 0) return res.status(404).send("No products found");
  
      const products = all.map((product) => {
        return {
          thumbnail: product.thumbnail,
          title: product.title,
          price: product.price,
        };
      });
  
      const cards = products.map((product) => {
        return `
                  <div class="col-md-6 col-lg-3 destacados">
                    <img src="${product.thumbnail}" alt="Producto" class="productosdestacadosimg">
                    <h3>${product.title}</h3>
                    <h2>
                        ${product.price}
                    </h2>
                <a href="../pages/product/producto1.html" class="comprar">Comprar</a>
            </div>

            `;
      });
  
      const htmlFilePath = path.resolve('./public/pages/products.html');
      console.log(htmlFilePath); // Output: /path/to/your/project/src/public/pages/products.html
      const html = fs.readFileSync(htmlFilePath, "utf8");
  
      const modifiedHtml = html.replace("<!-- PRODUCT_CARDS -->", cards.join(""));
      res.send(modifiedHtml);
    } catch (error) {
      console.error(error.message);
      next(error);
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
