import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Order from '~/Models/Schemas/Order.schema'
import databaseservice from '~/Services/database.services'
import ordersService from '~/Services/orders.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { OrderReqbody } from '~/Models/requests/Order.requests'
import {
  TokenPayload,

} from '~/Models/requests/User.requests'
import cartsService from '~/Services/carts.services'
import { ObjectId } from 'mongodb'
import productsService from '~/Services/products.services'

export const createOrderController = async (req: Request<ParamsDictionary, any, OrderReqbody>, res: Response) => {
  try {
    const { user_id } = req.decode_authorization as TokenPayload
    const addressUser = await ordersService.checkAddress(user_id)
    
    if (!addressUser) {
      return res.status(404).json({
        message: 'Vui lòng điền địa chỉ cho đơn hàng !'
      })
    }

    const order = await ordersService.createOrder(req?.body, addressUser)

    if (order === false) {
      return res.status(404).json({
        message: 'Đặt hàng thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Đặt hàng thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}

export const getOrderByUserIdController = async (req: Request<ParamsDictionary>, res: Response) => {
  try {
    const { user_id } = req.decode_authorization as TokenPayload
    const status = req?.body?.status

    const order = await ordersService.getOrderByUserId(user_id, status)
    if (!order) {
      return res.status(404).json({
        message: 'Không tìm thấy giao dịch !'
      })
    }
    const data = order 
    const cartId = order?.cartId as ObjectId

    const cart = await cartsService.getCartByObjectCartId(cartId)
    if (!cart) {
      return res.status(404).json({
        message: 'Không tìm thấy giao dịch !'
      })
    }
    const productId = cart?.productId as ObjectId

    const products = await productsService.getProductById(productId)
    if (!products) {
      return res.status(404).json({
        message: 'Không tìm thấy giao dịch !'
      })
    }
        

    // if (!order || order.length === 0) {
    //   return res.status(404).json({
    //     message: 'Không có sản phẩm nào !'
    //   })
    // }

    return res.status(200).json({
      data: [{
        order: order?.status,
        address: order?.address,
        payment: order?.payment,
        quantity: cart?.quantity,
        ...products

      }
      ],
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
    const updatedOrder = await ordersService.updateQuantity(req.body?._id, updatedOrderData)
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
export const updateStatusController = async (req: Request, res: Response) => {
  try {
    const updatedOrderData = req?.body
    const updatedOrder = await ordersService.updateStatus(req.body?._id, updatedOrderData)
    const data = updatedOrder

    return res.status(200).json({
      data,
      message: 'Cập nhật trạng thái thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const id = req.body?._id

    const deletedOrder = await ordersService.deleteOrder(id)

    if (!deletedOrder) {
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
