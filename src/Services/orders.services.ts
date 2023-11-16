import databaseservice from './database.services'
import { ObjectId } from 'mongodb'
import { OrderReqbody } from '~/Models/requests/Order.requests'
import Order from '~/Models/Schemas/Order.schema'

class OrdersService {
  async createOrder(payload: OrderReqbody) {
    const order = await databaseservice.orders.insertOne(
      new Order({
        ...payload,
        productId: new ObjectId(payload.productId)
      })
    )
    return order.acknowledged

  }

  async getOrderByUserId(user_id: string) {
    // const orders = await databaseservice.orders.find({ user_id: userId })
    const orders = await databaseservice.orders.aggregate([
      {
        $match: {
          userId: user_id
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: {
          path: '$product',
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "product.categoryId",
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
          order_code: 1,
          completeAt: 1,
          userId: 1,
          image: 1,
          payment: 1,
          reason: 1,
          address: 1,
          quantity: 1,
          productName: "$product.name",
          productPrice: "$product.price",
          productImage: "$product.image",
          productUnit: "$product.unit",
          productdiscount: "$product.discount",
          categoryName: "$category.name",
        }
      }
    ])

    return orders.toArray()
  }

  async updateQuantity(id: string, updatedOrderData: any) {
    const orderId = new ObjectId(id)    
    const order = await databaseservice.orders.updateOne({ _id: orderId }, [
      {
        $set: {
          quantity: updatedOrderData.quantity,
        }
      }
    ])

    // if (order.modifiedCount === 0 && order.acknowledged === false) {
    //   return []
    // }
    
    return order.acknowledged
  }

  async deleteOrder(order_id: string) {
    const order = await databaseservice.orders.findOneAndDelete({ _id: new ObjectId(order_id) })
    return order
  }

}
const orderService = new OrdersService()
export default orderService

