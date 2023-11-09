import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Product from '~/Models/Schemas/Product.schema'
import databaseservice from '~/Services/database.services'
import productsService from '~/Services/products.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { ProductReqbody } from '~/Models/requests/Product.requests'
import { SearchQuery } from '~/Models/requests/Search.requests'

export const createProductController = async (req: Request<ParamsDictionary, any, ProductReqbody>, res: Response) => {
  try {
    const pro = req.body
    const product = await productsService.createProduct(req.body)

    if (product === false) {
      return res.status(404).json({
        error: 'Create product failed'
      })
    }

    return res.status(200).json({
      message: 'Create product success'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await productsService.getAllProducts()
    if (products.length === 0) {
      return res.status(404).json({
        error: 'No products found'
      })
    }

    return res.status(200).json({
      products,
      message: 'Get all products success'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
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
        message: 'Get all product success'
      })
    }

    products = await productsService.getProductByKeyWord(keyWord)
    data = products

    if (!products || products.length === 0) {
      data = products
      return res.status(200).json({
        data,
        message: 'Get all product success'
      })
    }

    return res.status(200).json({
      data,
      message: 'Search product success'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
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
        message: 'Get product detail failed'
      })
    }

    const products = await productsService.getProductById(_id)
    data = products

    if (!products) {
      data = products
      return res.status(404).json({
        data,
        message: 'Get product detail failed'
      })
    }

    return res.status(200).json({
      data,
      message: 'Get product success'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
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
        error: 'Product updated failed'
      })
    }

    return res.status(200).json({
      updatedProduct,
      message: 'Product updated successfully'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const id = req.body._id

    const deletedProduct = await productsService.deletedProduct(id)

    if (!deletedProduct) {
      return res.status(404).json({
        error: 'Product not found'
      })
    }

    return res.status(200).json({
      message: 'Delete successfully'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}
