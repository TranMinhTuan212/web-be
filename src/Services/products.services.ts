import User from '~/Models/Schemas/User.schema'
import databaseservice from './database.services'
import { RegisterReqbody } from '~/Models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { ProductReqbody } from '~/Models/requests/Product.requests'
import Product from '~/Models/Schemas/Product.schema'
import { SearchQuery } from '~/Models/requests/Search.requests'

class ProductsService {
    async createProduct(payload: ProductReqbody) {
        const product = await databaseservice.products.insertOne(
            new Product({
                ...payload,
            })
        )
        return "product"
    }

    async getAllProducts() {
        const products = await databaseservice.products.find()
        return products.toArray()
        // const productsCursor = await databaseservice.products.find();
        // const products = await productsCursor.toArray();
        // return products;
    }

    async getProductByWord(querry: string) {

        const product = await databaseservice.products.find({$text: {$search: querry}})

        return product.toArray()
        
        
    }

    async updateProduct(_id: any, updatedProductData: any) {
        const product = await databaseservice.products.updateOne( 
            { _id },
            [ { $set: { "name": updatedProductData.name, modified: "$$NOW"} } ] )
            // db.students.updateOne( { _id: 3 }, [ { $set: { "test3": 98, modified: "$$NOW"} } ] )
            console.log(product);
            
        return product
    }

    async deletedProduct(id: string, deleteProductData: any) {
        const product = await databaseservice.products.findOneAndDelete({ id: id },
            deleteProductData)
        return product
    }

    async checkProduct(email: string) {
        const product = await databaseservice.products.findOne({ email })
        return Boolean(product)
    }

}
const productsService = new ProductsService()
export default productsService

