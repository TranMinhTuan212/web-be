import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Order from '~/Models/Schemas/Order.schema'
import databaseservice from '~/Services/database.services'
import ordersService from '~/Services/orders.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { OrderReqbody } from '~/Models/requests/Order.requests'

export const createOrderController = async (req: Request<ParamsDictionary, any, OrderReqbody>, res: Response) => {
  try {
    const order = await ordersService.createOrder(req?.body)

    if (order === false) {
      return res.status(404).json({
        message: 'Tạo đơn hàng thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Thêm sản phẩm vào giỏ hàng thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi !'
    })
  }
}

export const getOrderByUserIdController = async (req: Request<ParamsDictionary>, res: Response) => {
  try {
    const iserId = req.body.user_id
    const order = await ordersService.getOrderByUserId(iserId)
    const data = order

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
      message: 'Lỗi !'
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
      message: 'Lỗi !'
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
      message: 'Lỗi !'
    })
  }
}
