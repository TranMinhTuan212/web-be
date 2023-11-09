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
        return product.acknowledged
    }

    async getAllProducts() {
        const products = await databaseservice.products.find()
        return products.toArray()
    }

    async getProductByKeyWord(keyWord: string) {

        const product = await databaseservice.products.find({
            $and: [
                {
                    $or: [
                        { name: { $regex: new RegExp(`.*${keyWord}.*`, 'i') } },
                        { description: { $regex: new RegExp(`.*${keyWord}.*`, 'i') } },
                    ],
                },
                // { status: "ON_SALE" },
            ],
        })

        return product.toArray()
    }

    async updateProduct(id: string, updatedProductData: any) {

        const productId = new ObjectId(id);

        const product = await databaseservice.products.updateOne(
            { _id: productId },
            [{
                $set: {
                    "name": updatedProductData.name,
                    "price": updatedProductData.price,
                    "category_id": updatedProductData.category_id,
                    "description": updatedProductData.description,
                    "sold_count": updatedProductData.sold_count,
                    "photo": updatedProductData.photo,
                    "quantity": updatedProductData.quantity,
                }
            }],
        );

        if (product.modifiedCount === 0) {
            return false
        }

        return true;
    }

    async deletedProduct(id: string) {
        const productId = new ObjectId(id);
        const product = await databaseservice.products.findOneAndDelete({ _id: productId })

        return product
    }

    async checkProduct(email: string) {
        const product = await databaseservice.products.findOne({ email })
        return Boolean(product)
    }

}
const productsService = new ProductsService()
export default productsService

