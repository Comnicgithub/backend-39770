import {Router} from "express"
import Products from '../../models/product.model.js'
import session from "express-session"
import Users from "../../models/user.model.js"

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try {
            //let hola = chau
            return res.render(
                'index', //nombre de la vista
                {
                    name: 'Nico',
                    last_name: 'Lopez',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',


                    title: 'index',
                    script: '/public/conection.js'
                }
            )
        } catch (error) {
            next(error)
        }
    }
)

router.get("/products/:pid", async (req, res, next) => {
    try {
        return res.render("view_product", {
            script2: '/public/uniqueProduct.js',
            topTitle: "prueba",
            conection: '/public/conection.js'
        })
    } catch (error) {

    }
})

router.get('/products', async (req, res, next) => {
    try {
        const pageNumber = parseInt(req.query.page) || 1;
        const productsPerPage = req.query.limit || 6;
        const filter = req.query.filter || "";
        const query = {};
        if (filter) {
            query.title = {
                $regex: filter,
                $options: "i"
            };
        }
        const products = await Products.paginate(query, {
            page: pageNumber,
            limit: productsPerPage
        });
        console.log(products)

        const formattedProducts = products.docs.map(product => ({
            title: product.title,
            thumbnail: product.thumbnail,
            price: product.price,
            link: `/products/${product._id}`
        }));

        return res.render('products', {
            products: formattedProducts,
            title: 'Products Page',
            topTitle: `Total Products: ${products.totalDocs}`,
            limit: `Productos por pagina ${products.limit}`,
            conection: '/public/conection.js',
            cart: 'numProducts',
            paginationprev: `${products.prevPage}`,
            paginationnext: `${products.nextPage}`,
            currentPage: `Pagina ${pageNumber}`,
            totalPages: products.totalPages,
            filter: filter
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});
router.get(
    '/new_product',
    async (req, res, next) => {
        try {
            return res.render(
                'new_product', {
                    title: 'new_product',
                    title: 'Product',
                    conection: '/public/conection.js'
                }
            )
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/carts',
    async (req, res, next) => {
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
    async (req, res, next) => {
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
    async (req, res, next) => {
        try {
            return res.render(
                'form', {
                    title: 'Form',
                    conection: '/public/conection.js'
                }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/register',
    async (req, res, next) => {
        try {
            return res.render(
                'register', {
                    title: 'Register',
                    conection: '/public/conection.js'
                }
            )
        } catch (error) {
            next()
        }
    }
)

router.get('/login', async (req, res, next) => {
    try {
        return res.render('login', {title: 'Login',
        conection: '/public/conection.js'})
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/signout', async (req, res, next) => {
    try {
        const user = req.session
        return res.render('signout', {title: 'signout',
        conection: '/public/conection.js'})
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/perfil', async (req, res) => {
    try {
        // Aquí, normalmente podrías verificar las credenciales del usuario
        // y establecer `req.session.email` en el correo electrónico del usuario

        const user = req.session

        if (user) {
            req.session.email = user.mail;
        } else {
            // handle error
        }

        res.render('perfil', {
            // Pasa el objeto `req.session` a la plantilla Handlebars
            session: req.session
        });
    } catch (err) {
        // handle error
    }
});

export default router