//Realizar una clase “ProductManager” que gestione un conjunto de productos.
//Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

//Cada producto que gestione debe contar con las propiedades:
// title (nombre del producto)
// description (descripción del producto)
// price (precio)
// thumbnail (ruta de imagen)
// id (código identificador)
// stock (número de piezas disponibles)

// Aspectos a incluir
// Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
// Todos los campos son obligatorios menos id que debe agregarse automáticamente  y auto- incrementable

// Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

// Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
// En caso de no coincidir ningún id, mostrar en consola un error “Not found”

// Formato del entregable

// Pull Request (PR) de rama sprint-1 hacia main/master según corresponda
// Incluir readme.md explicando lo que se entregó



class ProductManager {

    #iva

    constructor() {
        this.products = []
        this.#iva = 0.21
    }

    getProducts() {
        console.log(this.products)
        return this.products
    }

    getProductById(product_id) {
        let buscar = this.products.find(each=> each.id === product_id)
        if (buscar) {
            console.log(buscar)
            return buscar
        }
        console.log('not found')
        return null
    }

    addProduct({title, description, price, thumbnail, stock}) {
        let id = 0
        if (this.products.length===0){
            id = 1
        } else {
            let lastProduct = this.products[this.products.length-1]
            id = lastProduct.id + 1
        }
        price = price + this.#iva * price
        let product = {id,title, description, price, thumbnail, stock}
        this.products.push(product)
    }
}

let product = new ProductManager()

product.addProduct({title: 'iphone x', description: 'Usadito pero anda bien :)', price: 35000, thumbnail: './img/iphone002.jpg', stock: 3})
product.addProduct({title: 'PC Gamer I7', description: 'Nave de pc', price: 80000, thumbnail: './img/pc002.jpg', stock: 20})
product.addProduct({title: 'Ipad pro retina', description: 'Nuevita ', price: 90, thumbnail: './img/ipad998.jpg', stock: 15})
product.addProduct({title: 'Calefon electrico', description: 'hay que facturar asi que vendemos lo que sea', price: 2000, thumbnail: './img/calefon.jpg', stock: 10})
product.addProduct({title: 'HeadSet Astros A50', description: 'Una locura lo que se escuchan', price: 5064, thumbnail: './img/a50.jpg', stock: 25})
product.addProduct({title: 'Camara Canon EOS T6', description: 'Hermosa camara, sentite un profesional', price: 60000, thumbnail: './img/canont6.jpg', stock: 1})

product.getProducts()
product.getProductById(5)
product.getProductById(10)