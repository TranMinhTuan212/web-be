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
        categoryId: new ObjectId(payload.categoryId),
        tableName: "product"
      })
    )
    return product.acknowledged
  }

  async getAllProducts() {
    const products = await databaseservice.products.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: {
          path: '$category',
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
          category_id: 1,
          origin: 1,
          unit: 1,
          code: 1,
          discount: 1,
          categoryName: "$category.name",
        }
      }
    ])
    return products.toArray()
  }

  async getProductByKeyWord(keyWord: string) {

    const product = await databaseservice.products.aggregate([
      {
        $match: {
          name: { $regex: new RegExp(`.*${keyWord}.*`, 'i') }
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: {
          path: '$category'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
          category_id: 1,
          origin: 1,
          unit: 1,
          code: 1,
          discount: 1,
          categoryName: '$category.name'
        }
      }
    ])

    return product.toArray()
  }

  async getProductById(_id: string) {
    const product = await databaseservice.products.findOne({ _id: new ObjectId(_id) })

    return { product }
  }

  async updateProduct(id: string, updatedProductData: any) {
    const productId = new ObjectId(id)

    const product = await databaseservice.products.updateOne({ _id: productId }, [
      {
        $set: {
          name: updatedProductData.name,
          price: updatedProductData.price,
          category_id: updatedProductData.categoryId,
          description: updatedProductData.description,
          image: updatedProductData.image,
          unit: updatedProductData.unit,
          origin: updatedProductData.origin
        }
      }
    ])
    return product.acknowledged
  }

  async deletedProduct(id: string) {
    const productId = new ObjectId(id)
    const product = await databaseservice.products.findOneAndDelete({ _id: productId })

    return product
  }

  async checkCodeProduct(code: string) {
    const product = await databaseservice.products.findOne({ code: code })
    return Boolean(product)
  }
}
const productsService = new ProductsService()
export default productsService
