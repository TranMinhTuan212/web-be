import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Order from '~/Models/Schemas/Order.schema'
import databaseservice from '~/Services/database.services'
import cartsService from '~/Services/carts.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { CartReqbody } from '~/Models/requests/Cart.requests'
import productsService from '~/Services/products.services'

import {
  TokenPayload,

} from '~/Models/requests/User.requests'
import { Double, ObjectId } from 'mongodb'

export const createCartController = async (req: Request<ParamsDictionary>, res: Response) => {
  try {
    const { user_id } = req.decode_authorization as TokenPayload
    const quatityBuy = req?.body?.quantity as Double

    const product = await productsService.getProductById(req?.body.productId)
    const quantityProduct = product.product?.quantity as Double
    
    if (quantityProduct <= quatityBuy) {
      return res.status(404).json({
        message: 'Hiện tại đã hết hàng cho sản phẩm này !' 
      })
    }
  
    const order = await cartsService.createCart(req?.body, user_id)

    if (order === false) {
      return res.status(404).json({
        message: 'Thêm sản phẩm vào giỏ hàng thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Thêm sản phẩm vào giỏ hàng thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}

export const getCartByUserIdController = async (req: Request<ParamsDictionary>, res: Response) => {
  try {
    const { user_id } = req.decode_authorization as TokenPayload
    
    const cart = await cartsService.getCartByUserId(user_id)
    const data = cart

    // if (!order || order.length === 0) {
    //   return res.status(404).json({
    //     message: 'Không có sản phẩm nào !'
    //   })
    // }

    return res.status(200).json({
      data,
      message: 'Lấy sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}

export const updateQuantityController = async (req: Request, res: Response) => {
  try {
    const updatedOrderData = req?.body
    const quatityBuy = req?.body?.quantity as Double

    const order = await cartsService.getCartByCartId(req.body?._id)
    const productId = order?.productId as ObjectId

    const product = await productsService.getProductById(productId)
    const quantityProduct = product.product?.quantity as Double    
    
    if (quantityProduct <= quatityBuy) {
      return res.status(404).json({
        message: 'Hiện tại đã hết hàng cho sản phẩm này !' 
      })
    }
    
    const updatedOrder = await cartsService.updateQuantity(req.body?._id, updatedOrderData)
    const data = updatedOrder

    return res.status(200).json({
      data,
      message: 'Cập nhật sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}

export const deleteCartController = async (req: Request, res: Response) => {
  try {
    const id = req.body?._id

    const deletedCart = await cartsService.deleteCart(id)

    if (!deletedCart) {
      return res.status(404).json({
        message: 'Xóa sản phẩm thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Xóa sản phẩm thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}
