import databaseservice from './database.services'
import { ObjectId } from 'mongodb'
import { OrderReqbody } from '~/Models/requests/Order.requests'
import Order from '~/Models/Schemas/Order.schema'

class OrdersService {
    async createOrder(payload: OrderReqbody) {
        const order = await databaseservice.orders.insertOne(
            new Order({
                ...payload,
            })
        )        
        return order.acknowledged
        
    }

    async getOrderByUserId(userId: string) {
        const orders = await databaseservice.orders.find({ user_id: userId })
        return orders.toArray()
    }

    async deleteOrder(order_id: string) {
        const order = await databaseservice.orders.findOneAndDelete({ _id: new ObjectId(order_id) })
        return order
    }

}
const orderService = new OrdersService()
export default orderService

