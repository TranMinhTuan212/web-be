import databaseservice from './database.services'
import { ObjectId } from 'mongodb'
import { CommentReqbody } from '~/Models/requests/Comment.requests'
import Comment from '~/Models/Schemas/Comment.schema'
import Address from '~/Models/Schemas/Address.schema'

class OrdersService {
  async createComment(payload: CommentReqbody, userId: string) {
    const order = await databaseservice.comments.insertOne(
      new Comment({
        ...payload,
        userId: new ObjectId(userId),
        productId: new ObjectId(payload.productId),
      })
    )
    return order.acknowledged

  }

  async getCommentId(comment_id: string, userIdNow: string) {
    
    const comment = await databaseservice.comments.findOne({ $and: [{ _id: new ObjectId(comment_id), userId: new ObjectId(userIdNow) }] })
   
    return comment
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

  async deleteComment(comment_id: string) {
    const comment = await databaseservice.comments.findOneAndDelete({ _id: new ObjectId(comment_id) })
    return comment
  }

}
const orderService = new OrdersService()
export default orderService

