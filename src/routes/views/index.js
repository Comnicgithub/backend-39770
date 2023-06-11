import { Router } from "express"
import Products from '../../models/prodcuct.model.js'
import Carts from '../../models/cart.model.js'
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
                <a href="" class="comprar">Comprar</a>
            </div>

            `;
      });
  
      const htmlFilePath = path.resolve('./public/pages/products.html');
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

//   router.get('/cart', async (req, res, next) => {
//     try {
//       const one = await Carts.findOne({}, {}, { sort: { 'created_at' : -1 } });
// if (!one) return res.status(404).send("No products found");

// const cart = {
//     thumbnail: cart.products.thumbnail,
//     title: cart.products.title,
//     price: cart.products.price,
//     unit: cart.products.unit
// };
//       const cards = cart.map((cart) => {
//         return `
//                   <div class="col-md-6 col-lg-3 destacados">
//                     <img src="${cart.products.thumbnail}" alt="Producto" class="productosdestacadosimg">
//                     <h3>${cart.products.title}</h3>
//                     <h2>${cart.products.price} </h2>
//                     <h2>${cart.products.units} </h2>
//             </div>

//             `;
//       });
  
//       const htmlFilePath = path.resolve('./public/pages/cart.html');
//       const html = fs.readFileSync(htmlFilePath, "utf8");
  
//       const modifiedHtml = html.replace("<!-- CARRITO -->", cards.join(""));
//       res.send(modifiedHtml);
//     } catch (error) {
//       console.log(error);
//       next();
//     }
//   });

// Cambiar "async" por "(req, res)" en la declaración del enrutador, que es equivalente
router.get('/cart', async (req, res) => {

  // Seleccionar el último carrito creado
  const one = await Carts.findOne({}, {}, { sort: { 'created_at' : -1 } });

  // Si no se encuentra ningún producto, enviar un error 404
  if (!one) {
    return res.status(404).send("No products found");
  }

  // Crear un arreglo vacío para agregar los productos seleccionados
  const cart = [];

  // Agregar los productos seleccionados a "cart" (suponiendo que "products" es una propiedad de "one" que contiene productos)
  one.products.forEach((product) => {
    cart.push({
      product: product.product,
      units: product.units // Cambiar "unit" por "units" para que coincida con la propiedad creada en el objeto del producto.
    });
  });

  // Crear la plantilla HTML y reemplazar la sección de carrito con los productos seleccionados
  const htmlFilePath = path.resolve('./public/pages/cart.html');
  const html = fs.readFileSync(htmlFilePath, "utf8");
  const cards = cart.map((product) => {
    return `
      <div>
        <h2>codigo del prodcuto: ${product.product}</h2>
        <h3>Cantidad: ${product.units}</h3>
      </div>
    `;
  });

  const modifiedHtml = html.replace("<!-- CARRITO -->", cards.join(""));
  res.send(modifiedHtml);
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
