import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Product from '~/Models/Schemas/Product.schema'
import databaseservice from '~/Services/database.services'
import productsService from '~/Services/products.services'
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
        error: 'Mã sản phẩm đã tồn tại !'
      })
    }
    product = await productsService.createProduct(req?.body)
    // const medias = await mediasService.handleUploadSingImage()

    if (product === false || product === undefined) {
      return res.status(404).json({
        error: 'Thêm sản phẩm thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Thêm sản phẩm thành công'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Thêm sản phẩm thất bại !'
    })
  }
}

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts()
    if (products.length === 0) {
      return res.status(404).json({
        error: 'Không tìm thấy sản phẩm nào !'
      })
    }

    return res.status(200).json({
      products,
      message: 'Lấy tất cả sản phẩm thành công'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Không tìm thấy sản phẩm nào !'
    })
  }
}

export const getProductByKeyWordController = async (
  req: Request<ParamsDictionary, any, any, SearchQuery>,
  res: Response
) => {
  try {    

    const keyWord = req.body.keyWord
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

    if (!products || products.length === 0) {
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
  } catch (error) {
    return res.status(500).json({
      error: 'Không tìm thấy sản phẩm nào !'
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
  } catch (error) {
    return res.status(500).json({
      error: 'Không tìm thấy sản phẩm nào !'
    })
  }
}

export const updateProductController = async (req: Request, res: Response) => {
  try {
    // const { id } = req.query._id;
    const updatedProductData = req.body

    const updatedProduct = await productsService.updateProduct(req.body._id, updatedProductData)

    if (updatedProduct === false) {
      return res.status(404).json({
        error: 'Không tìm thấy sản phẩm nào !'
      })
    }

    return res.status(200).json({
      updatedProduct,
      message: 'Cập nhật sản phẩm thành công'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Không tìm thấy sản phẩm nào !'
    })
  }
}

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = req.body._id

    const deletedProduct = await productsService.deletedProduct(id)

    if (!deletedProduct) {
      return res.status(404).json({
        error: 'Không tìm thấy sản phẩm nào !'
      })
    }

    return res.status(200).json({
      message: 'Xóa sản phẩm thành công'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Không tìm thấy sản phẩm nào !'
    })
  }
}
