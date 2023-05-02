import fs from 'fs'
import manager from './script.js'

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.init(path);
    }

    init(path) {
        const file = fs.existsSync(path);
        if (!file) {
        fs.writeFileSync(path, '[]');
        console.log('file created at path: ' + this.path);
        } else {
        this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'));
        console.log('data recovered');
        }
    }


    async addCart({ productId, quantity }) {
        try { 
            let product = await manager.getProductById(productId).title
            let data = { product, quantity };
            let nextCartId = 1;
        if (this.carts.length > 0) {
            nextCartId = this.carts[this.carts.length - 1].id + 1;
        }
        data.id = nextCartId;
        this.carts.push(data);
        let data_json = JSON.stringify(this.carts, null, 2);
        await fs.promises.writeFile(this.path, data_json);
        console.log('cart id created: ' + data.id);
        return data;
        } catch (error) {
        console.log(error);
        return 'Error: Creating cart';
        }
    }

    getCarts() {
        try {
        if (this.carts.length === 0) {
            console.log('Not found');
        } else {
            console.log(this.carts);
        }
        } catch (error) {
        console.log(error);
        return 'getCart: Error';
        }
    }

    read_Carts() {
        return this.carts;
    }

    read_Cart(id) {
        let one = this.carts.find((each) => each.id === id);
        return one;
    }

    getCartById(pid) {
        let buscar = this.read_Cart(pid);
        try {
        if (buscar) {
            console.log(buscar);
            return buscar;
        } else {
            console.log('not found');
            return 'Not found';
        }
        } catch (error) {
        console.log(error);
        return 'getCartById: Error';
        }
    }

//     async updateCart(cid, data) {
//         try {
//         let one = this.read_Cart(cid);
//         if (one) {
//             if (Object.keys(data).length > 0) {
//             for (let prop in data) {
//                 one[prop] = data[prop];
//             }
//             }
//         } else {
//             console.log('Not found');
//             return 'Not found';
//         }
//         let data_json = JSON.stringify(this.carts, null, 2);
//         await fs.promises.writeFile(this.path, data_json);
//         console.log('updateCart: done');
//         return 'updateCart: done';
//         } catch (error) {
//         console.log(error);
//         return 'updateCart: error';
//         }
//     }

// async deleteCart(cid) {
//     try {
//         let one = this.read_Cart(cid);
//         if(one){
//             this.carts = this.carts.filter((each) => each.cid !== cid);
//             let data_json = JSON.stringify(this.carts, null, 2);
//             await fs.promises.writeFile(this.path, data_json);
//             console.log('deleteCart: done');
//             return 'deleteCart: done';
//         }else{
//             console.log('Not found')
//             return 'Not found'
//         }

//     } catch (error) {
//     console.log(error);
//     return 'deleteCart: error';
//     }
// }
}
let cartsManager = new CartManager('./data/cart.json')
// async function manage() {
//     await cartsManager.addCart({productId:4, quantity: 2})
//     await cartsManager.addCart({productId:2, quantity:10})
//     await cartsManager.addCart({productId:6, quantity:15})
//     await cartsManager.addCart({productId:10, quantity:15})
//     await cartsManager.addCart({productId:11, quantity:15})
//     await cartsManager.addCart({productId:9, quantity:15})
//     // await cartsManager.getCarts()
//     // await cartsManager.getCartById(2)
//     }
// manage()


export default cartsManager