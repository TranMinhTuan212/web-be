import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Order from '~/Models/Schemas/Order.schema'
import databaseservice from '~/Services/database.services'
import ordersService from '~/Services/orders.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { OrderReqbody } from '~/Models/requests/Order.requests'

export const createOrderController = async (req: Request<ParamsDictionary, any, OrderReqbody>, res: Response) => {
  try {
    const order = await ordersService.createOrder(req.body)

    if (order === false) {
      return res.status(404).json({
        error: 'Create product failed'
      })
    }

    return res.status(200).json({
      message: 'Create product success'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Tạo đơn hàng thất bại !'
    })
  }
}

export const getOrderByUserIdController = async (req: Request<ParamsDictionary>, res: Response) => {
  try {
    const iserId = req.body.user_id
    const order = await ordersService.getOrderByUserId(iserId)
    const data = order

    if (!order || order.length === 0) {
      return res.status(404).json({
        message: 'Get orders failed'
      })
    }

    return res.status(200).json({
      data,
      message: 'Get orders success'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export const deleteOrderController = async (req: Request, res: Response) => {
  try {
    const id = req.body._id

    const deletedOrder = await ordersService.deleteOrder(id)

    if (!deletedOrder) {
      return res.status(404).json({
        error: 'Order not found'
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
