import fs from 'fs'
import mongoose from "mongoose"
import ProductModel from "../../models/prodcuct.model.js"

class Product {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let file = fs.existsSync(path)
        console.log("heh")
        console.log(ProductModel)

        if (!file) {
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 201
        } else {
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 200
        }
    }
    async add_product({ title,description,price,thumbnail,stock }) {
        try {
            if (title&&description&&price&&thumbnail&&stock) {
                let data = { title,description,price,thumbnail,stock }
                if (this.products.length>0) {
                    let next_id = this.products[this.products.length-1].id+1
                    data.id = next_id
                } else {
                    data.id = 1
                }
                this.products.push(data)
                let data_json = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,data_json)
                await 
                console.log('id´s created product: '+data.id)
                return 201
            }
            console.log('complete data')
            return null
        } catch(error) {
            console.log(error)
            return null
        }
    }


    read_products() {
        return this.products
    }
    read_product(id) {
        return this.products.find(each=>each.id===id)
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

    async update_product(id,data) {
        try {
            let one = await this.read_product(id)
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            console.log('updated product: '+id)
            return 200
        } catch(error) {
            console.log(error)
            return null
        }
    }
    async destroy_product(id) {
        try {
            let one = this.products.find(each=>each.id===id)
            if (one) {
                this.products = this.products.filter(each=>each.id!==id)
                let data_json = JSON.stringify(this.products,null,2)
                await fs.promises.writeFile(this.path,data_json)
                console.log('delete product: '+id)
                return 200
            }
            console.log('not found')
            return null
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

let prod_manager = new Product('./src/data/products.json')

export default prod_manager


