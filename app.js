const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
        this.init(path);
    }

    init(path) {
        const file = fs.existsSync(path);
        if (!file) {
        fs.writeFileSync(path, '[]');
        console.log('file created at path: ' + this.path);
        return 'file created at path: ' + this.path;
        } else {
        this.products = JSON.parse(fs.readFileSync(path, 'UTF-8'));
        console.log('data recovered');
        return 'data recovered';
        }
    }

    async addProduct({ title, description, price, thumbnail, stock }) {
        try {
        let data = { title, description, price, thumbnail, stock };
        if (this.products.length > 0) {
            let next_id = this.products[this.products.length - 1].id + 1;
            data.id = next_id;
        } else {
            data.id = 1;
        }
        this.products.push(data);
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        console.log('id´s created product: ' + data.id);
        return 'id´s product: ' + data.id;
        } catch (error) {
        console.log(error);
        return 'Error: Creating product';
        }
    }

    getProducts() {
        try {
        if (this.products.length === 0) {
            console.log('Not found');
        }
        console.log(this.products);
        return this.products;
        } catch (error) {
        console.log(error);
        return 'getProduct: Error';
        }
    }
    read_products() {
        //console.log(this.users)
        return this.products;
    }

    read_product(id) {
        let one = this.products.find((each) => each.id === id);
        //console.log(one)
        return one;
    }
    getProductById(id) {
        let buscar = this.read_product(id);
        try {
        if (buscar) {
            console.log(buscar);
            return buscar;
        }
        console.log('not found');
        return 'Not found'
        } catch (error) {
        console.log(error);
        return 'getProductById: Error';
        }
    }

    async updateProduct(id, data) {
        try {
        let one = this.read_product(id);
        if(one){
            for (let prop in data) {
                one[prop] = data[prop];
            }
        }else{
            console.log('Not found')
            return 'Not found'
        }
        let data_json = JSON.stringify(this.products, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        console.log('updateProduct: done');
        return 'updateProduct: done';
        } catch (error) {
        console.log(error);
        return 'updateProduct: error';
        }
    }

    async deleteProduct(id) {
        try {
            let one = this.read_product(id);
            if(one){
                this.products = this.products.filter((each) => each.id !== id);
                let data_json = JSON.stringify(this.products, null, 2);
                await fs.promises.writeFile(this.path, data_json);
                console.log('deleteProduct: done');
                return 'deleteProduct: done';
            }else{
                console.log('Not found')
                return 'Not found'
            }

        } catch (error) {
        console.log(error);
        return 'deleteProduct: error';
        }
    }
    }

async function manager() {
    let product = new ProductManager('./data/user.json')
    await product.addProduct({title: 'iphone x', description: 'Usadito pero anda bien :)', price: 35000, thumbnail: './img/iphone002.jpg', stock: 3})
    await product.addProduct({title: 'PC Gamer I7', description: 'Nave de pc', price: 80000, thumbnail: './img/pc002.jpg', stock: 20})
    await product.addProduct({title: 'Ipad pro retina', description: 'Nuevita ', price: 90, thumbnail: './img/ipad998.jpg', stock: 15})
    await product.addProduct({title: 'Calefon electrico', description: 'hay que facturar asi que vendemos lo que sea', price: 2000, thumbnail: './img/calefon.jpg', stock: 10})
    await product.addProduct({title: 'HeadSet Astros A50', description: 'Una locura lo que se escuchan', price: 5064, thumbnail: './img/a50.jpg', stock: 25})
    await product.addProduct({title: 'Camara Canon EOS T6', description: 'Hermosa camara, sentite un profesional', price: 60000, thumbnail: './img/canont6.jpg', stock: 1})
    await product.getProductById(2)
    await product.getProductById(10)
    await product.updateProduct(200,{ title:'Nuevo nombre' })
    await product.updateProduct(2,{ price:'string' })
    await product.deleteProduct(10)
    product.getProducts()

}
manager()

