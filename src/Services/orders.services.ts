import databaseservice from './database.services'
import { ObjectId } from 'mongodb'
import { OrderReqbody } from '~/Models/requests/Order.requests'
import Order from '~/Models/Schemas/Order.schema'
import Address from '~/Models/Schemas/Address.schema'

class OrdersService {
  async createOrder(payload: OrderReqbody, addressUser: Address) {
    const order = await databaseservice.orders.insertOne(
      new Order({
        ...payload,
        cartId: new ObjectId(payload.cartId),
        userId: new ObjectId(payload.userId),
        address: addressUser.award + ', ' + addressUser.district + ', ' + addressUser.province ,
        status: "Chờ xác nhận"
      })
    )
    return order.acknowledged

  }

  async getOrderByUserId(user_id: string, statusOrder: string) {
    
    const orders = await databaseservice.orders.findOne({ $and: [{ userId: new ObjectId(user_id) }, { status: statusOrder }] })
   
    return orders
  }

  async checkAddress(user_id: string) {
    const address = await databaseservice.address.findOne({ user_id: new ObjectId(user_id) })

    return address

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
  async updateStatus(id: string, updatedOrderData: any) {
    const orderId = new ObjectId(id)    
    const order = await databaseservice.orders.updateOne({ _id: orderId }, [
      {
        $set: {
          status: updatedOrderData.status,
        }
      }
    ])
    
    return order.acknowledged
  }

  async deleteOrder(order_id: string) {
    const order = await databaseservice.orders.findOneAndDelete({ _id: new ObjectId(order_id) })
    return order
  }

}
const orderService = new OrdersService()
export default orderService

