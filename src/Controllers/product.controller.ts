import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Product from '~/Models/Schemas/Product.schema'
import databaseservice from '~/Services/database.services'
import productsService from '~/Services/products.services'
import categoriesService from '~/Services/categories.services'
import mediasService from '~/Services/medias.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { ProductReqbody } from '~/Models/requests/Product.requests'
import { SearchQuery } from '~/Models/requests/Search.requests'

export const createProductController = async (req: Request<ParamsDictionary, any, ProductReqbody>, res: Response) => {
  try {
    let product
    const checkCode = await productsService.checkCodeProduct(req.body?.code)

    if (checkCode === true) {
      return res.status(404).json({
        message: 'Mã sản phẩm đã tồn tại !'
      })
    }

    const category_id  = req.body?.categoryId
    const objectCategory = await categoriesService.getAllCategories()
    const listIdCategory = objectCategory.map((category) => category._id)
    const stringsIdCategory = []

    for (const id of listIdCategory) {
      stringsIdCategory.push(id.toString())
    }

    const isExistCategory = stringsIdCategory.includes(category_id)

    if (isExistCategory === true) {
      product = await productsService.createProduct(req?.body)
    }

    // // const medias = await mediasService.handleUploadSingImage()

    if (product === false || product === undefined) {
      return res.status(404).json({
        message: 'Thêm sản phẩm thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Thêm sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Thêm sản phẩm thất bại !'
    })
  }
}

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts()
    if (products.length === 0) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm nào !'
      })
    }

    return res.status(200).json({
      products,
      message: 'Lấy tất cả sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Không tìm thấy sản phẩm nào !'
    })
  }
}

export const getProductByKeyWordController = async (
  req: Request<ParamsDictionary, any, any, SearchQuery>,
  res: Response
) => {
  try {
    const keyWord = req.body?.keyWord
    let products
    let data

    if (keyWord === '' || keyWord === null || keyWord === undefined) {
      products = await productsService.getAllProducts()      
      data = products
      return res.status(200).json({
        data,
        message: 'Lấy tất cả sản phẩm thành công'
      })
    }

    products = await productsService.getProductByKeyWord(keyWord)
    data = products

    return res.status(200).json({
      data,
      message: 'Tìm sản phẩm thành công'
    })
  } catch (message) {
    
    return res.status(500).json({
      message: 'Có lỗi !'
    })
  }
}
export const getProductByIdController = async (
  req: Request<ParamsDictionary, any, any, SearchQuery>,
  res: Response
) => {
  try {
    const _id = req.body._id
    let data

    if (_id === '' || _id === null || _id === undefined) {
      return res.status(404).json({
        message: 'Không tìm thấy sản phẩm nào !'
      })
    }

    const products = await productsService.getProductById(_id)
    data = products

    if (!products) {
      data = products
      return res.status(404).json({
        data,
        message: 'Không tìm thấy sản phẩm nào !'
      })
    }

    return res.status(200).json({
      data,
      message: 'Tìm sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Không tìm thấy sản phẩm nào !'
    })
  }
}

export const updateProductController = async (req: Request, res: Response) => {
  try {
    // const { id } = req.query._id;
    const updatedProductData = req?.body
    let updatedProduct
    const checkCode = await productsService.checkCodeProduct(req.body?.code)

    if (checkCode === true) {
      return res.status(404).json({
        message: 'Mã sản phẩm đã tồn tại !'
      })
    }

    const category_id  = req.body?.categotyId
    const objectCategory = await categoriesService.getAllCategories()
    const listIdCategory = objectCategory.map(category => category._id)
    const stringsIdCategory = []

    for (const id of listIdCategory) {
      stringsIdCategory.push(id.toString())
    }

    const isExistCategory = stringsIdCategory.includes(category_id)
    if (isExistCategory === true) {
      updatedProduct = await productsService.updateProduct(req.body?._id, updatedProductData)
    }

    return res.status(200).json({
      updatedProduct,
      message: 'Cập nhật sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi !'
    })
  }
}

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = req.body?._id

    const deletedProduct = await productsService.deletedProduct(id)

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Xóa sản phẩm thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Xóa sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi !'
    })
  }
}
