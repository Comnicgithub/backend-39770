import fs from 'fs'

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
        return data
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
        return this.products;
    }

    read_product(id) {
        let one = this.products.find((each) => each.id === id);
        //console.log(one)
        return one;
    }
    getProductById(pid) {
        let buscar = this.read_product(pid);
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
    let manager = new ProductManager('./data/product.json')
// async function manage() {
//     await manager.addProduct({title: 'Té Dharamsala', description: '10 cajas x 20 bolsas', price: 18000, thumbnail: './img/iphone002.jpg', stock: 3})
//     await manager.addProduct({title: 'Cerveza tibetana Barley', description: '24 - bot. 12 l', price: 80000, thumbnail: './img/pc002.jpg', stock: 20})
//     await manager.addProduct({title: 'Sirope de regaliz', description: '12 - bot. 550 ml', price: 90, thumbnail: './img/ipad998.jpg', stock: 15})
//     await manager.addProduct({title: 'Mezcla Gumbo del chef Anton', description: '36 cajas', price: 2000, thumbnail: './img/calefon.jpg', stock: 10})
//     await manager.addProduct({title: 'Salsa de arándanos Northwoods', description: '12 - frascos 12 l', price: 5064, thumbnail: './img/a50.jpg', stock: 25})
//     await manager.addProduct({title: 'Queso Manchego La Pastora', description: '10 - paq. 500 g', price: 60000, thumbnail: './img/canont6.jpg', stock: 1})
//     await manager.addProduct({title: 'Cordero Alice Springs', description: '20 - latas 1 kg', price: 35000, thumbnail: './img/iphone002.jpg', stock: 3})
//     await manager.addProduct({title: 'Refresco Guaraná Fantástica', description: '12 - latas 355 ml', price: 80000, thumbnail: './img/pc002.jpg', stock: 20})
//     await manager.addProduct({title: 'Salchicha Thüringer', description: '50 bolsas x 30 salch', price: 90, thumbnail: './img/ipad998.jpg', stock: 15})
//     await manager.addProduct({title: 'Arenque salado', description: '4 - vasos 450 g', price: 2000, thumbnail: './img/calefon.jpg', stock: 10})
//     manager.getProducts()
//     await manager.getProductById(9)
//     await manager.updateProduct(9,{ title:'Chocolate Schoggi', description: '100 - piezas 100 g' })
//     await manager.getProductById(9)
//     await manager.deleteProduct(10)
// }
// manage()



export default manager


