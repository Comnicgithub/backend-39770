import  Products  from "./models/product.model.js"

class ProductDaoMongo {
    constructor(){
        this.Products = Products
    }
    get = async (limit=5, page=1) => {
        return await this.Products.paginate({}, {limit, page, lean: true} )
    }
    getById = async (pid) => {
        return await this.Products.findOne({_id: pid})
    }
    create = async () => {
        return await this.Products.create(newProduct)
    }
    update = async (pid, updateToProduct) => {
        return await this.Products.findByIdAndUpdate({_id: pid}, updateToProduct)
    }
    delete = async (pid) => {
        return await this.Products.findByIdAndDelete({_id: pid})

    }
}

export default  ProductDaoMongo