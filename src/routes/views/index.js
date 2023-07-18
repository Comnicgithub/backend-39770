import {Router} from "express"
import Products from '../../models/product.model.js'
import session from "express-session"
import Users from "../../models/user.model.js"
import passport_call from "../../middlewares/passport_call.js"
import authorization from "../../middlewares/authorization.js"

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try {
            const { token } = req.cookies
            const user = req.session
            return res.render(
                'index', 
                {
                    name: 'Nico',
                    last_name: 'Lopez',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',
                    title: 'index',
                    script: '/public/conection.js',
                    token,
                    session: req.session
                }
            )
        } catch (error) {
            next(error)
        }
    }
)
router.get("/products/:pid", async (req, res, next) => {
    try {
        const { token } = req.cookies
        return res.render("view_product", {
            script2: '/public/uniqueProduct.js',
            topTitle: "prueba",
            conection: '/public/conection.js',
            session: req.session,
            token
        })
    } catch (error) {

    }
})

router.get('/products', async (req, res, next) => {
    try {
        const { token } = req.cookies
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
            session: req.session,
            token,
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
    passport_call("jwt"),
    authorization,
    async (req, res, next) => {
        try {
            const { token } = req.cookies
            return res.render(
                'new_product', {
                    title: 'new_product',
                    title: 'Product',
                    conection: '/public/conection.js',
                    session: req.session,
                    token
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
            const { token } = req.cookies
            return res.render('carts', {
                name: 'Nico',
                last_name: 'Lopez',
                photo: 'https://www.w3schools.com/howto/img_avatar.png',
                script: "public/cart.js",
                conection: '/public/conection.js',
                session: req.session,
                token,
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
            const { token } = req.cookies
            return res.render('chat', {
                title: 'Chat bot',
                conection: '/public/conection.js',
                script2: "public/chatbot.js",
                session: req.session,
                token,
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
            const { token } = req.cookies
            return res.render(
                'form', {
                    title: 'Form',
                    conection: '/public/conection.js',
                    session: req.session,
                    token,
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
            const { token } = req.cookies
            return res.render(
                'register', {
                    title: 'Register',
                    conection: '/public/conection.js',
                    session: req.session,
                    token,
                }
            )
        } catch (error) {
            next()
        }
    }
)


router.get('/perfil', async (req, res) => {
    try {
        const { token } = req.cookies

        if (token) {

        }
        res.render('perfil', {
            // Pasa el objeto `req.session` a la plantilla Handlebars
            token,
            title: 'perfil',
            conection: '/public/conection.js',
            session: req.session
        });
    } catch (err) {
        // handle error
    }
});

export default router