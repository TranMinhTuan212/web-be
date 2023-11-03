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

    async getProductByKeyWord(keyWord: string) {

        const product = await databaseservice.products.find({
            $and: [
                { $or: [
                    { name: { $regex: new RegExp(`.*${keyWord}.*`, 'i') } },
                    { description: { $regex: new RegExp(`.*${keyWord}.*`, 'i') } },
                ], },
                { status: "ON_SALE" },
            ],
        })

        return product.toArray()
    }

    async updateProduct(id: string, updatedProductData: any) {

        const productId = new ObjectId(id);
            
        const product = await databaseservice.products.updateOne(
            { _id: productId },
            [{ $set: { "name": updatedProductData.name}}],
        );
    
        if (product.modifiedCount === 0) {
            return false
        }
    
        return true;
    }

    async deletedProduct(_id: string) {
        const product = await databaseservice.products.deleteOne({ _id: new ObjectId(_id)})        
        return product.acknowledged
    }

    async checkProduct(email: string) {
        const product = await databaseservice.products.findOne({ email })
        return Boolean(product)
    }

}
const productsService = new ProductsService()
export default productsService

