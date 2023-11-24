import User from '~/Models/Schemas/User.schema'
import databaseservice from './database.services'
import { Double, ObjectId } from 'mongodb'
import { ProductReqbody } from '~/Models/requests/Product.requests'
import Product from '~/Models/Schemas/Product.schema'
import { getNameFullName, handlerUploadImage } from '~/Utils/file'
import path from 'path'
import { UPLOAD_DRI } from '~/Constants/dir'
import sharp from 'sharp'
import { isProduction } from '~/Constants/config'
import fs from 'fs'
import { Request } from 'express'

class ProductsService {
  async createProduct(payload: ProductReqbody) {
    const product = await databaseservice.products.insertOne(
      new Product({
        ...payload,
        categoryId: new ObjectId(payload.categoryId),
        price: payload.price as Double,
        discount: payload.discount as Double,
        tableName: 'product',
        version: 0
      })
    )

    // console.log(product);

    return product.insertedId
  }

  async getAllProducts() {
    const products = await databaseservice.products.aggregate([
      {
        $lookup: {
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category'
        }
      },
      // {
      //   $skip: pageIndex * pageSize, // Thêm giai đoạn `skip` để phân trang
      // },
      // {
      //   $limit: pageSize, // Thêm giai đoạn `limit` để phân trang
      // },
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
          from: 'categories',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'category'
        }
      },
      {
        $unwind: {
          path: '$category'
        }
      },
      // {
      //   $skip: pageIndex * pageSize, // Thêm giai đoạn `skip` để phân trang
      // },
      // {
      //   $limit: pageSize, // Thêm giai đoạn `limit` để phân trang
      // },
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
          description: updatedProductData.description,
          price: parseFloat(updatedProductData.price),
          categoryId: new ObjectId(updatedProductData.categoryId),
          origin: updatedProductData.origin,
          code: updatedProductData.code,
          unit: updatedProductData.unit,
          discount: parseFloat(updatedProductData.discount),
          version: updatedProductData.version + 1
        }
      }
      // ,{
      //   returnDocument: 'after'
      // }
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
  async checkVersionProduct(productId: string, productVersion: number) {
    const product = await databaseservice.products.findOne({
      $and: [{ _id: new ObjectId(productId) }, { version: productVersion }]
    })

    return product
  }

  async handlerUploadImage(req: Request, productId?: string) {
    const file = await handlerUploadImage(req)
    const newName = getNameFullName(file.newFilename)
    const newPath = path.resolve(UPLOAD_DRI, `${newName}.jpg`)
    // Lưu hình ảnh mới vào thư mục và lấy đường dẫn
    await sharp(file.filepath).jpeg({ quality: 50 }).toFile(newPath)
    fs.unlinkSync(file.filepath)
    // const imageUrl = isProduction
    //   ? `${process.env.HOST}/imageMedias/${newName}.jpg`
    //   : `http://localhost:${process.env.PORT}/imageMedias/${newName}.jpg`
    const imageUrl = isProduction ? `${process.env.HOST}/imageMedias/${newName}.jpg` : `${newName}.jpg`

    //Tìm và cập nhật hình ảnh trong cơ sở dữ liệu
    const updatedUser = await databaseservice.products.findOneAndUpdate(
      { _id: new ObjectId(productId) },
      { $set: { image: imageUrl } },
      { returnDocument: 'after' } // Trả về bản ghi đã được cập nhật
    )
    return { imageUrl }
  }
}

const productsService = new ProductsService()
export default productsService
