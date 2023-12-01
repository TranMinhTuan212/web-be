import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface CommentType{
    _id?: ObjectId
    userId: ObjectId
    productId: ObjectId
    comment: String
    evaluate: Double
    created_at?: Date
    updated_at?: Date
}

export default class Order{
    _id?: ObjectId
    userId: ObjectId
    productId: ObjectId
    comment: String
    evaluate: Double
    created_at?: Date
    updated_at?: Date

    constructor(order: CommentType){
        const date = new Date()
        this._id = order._id
        this.userId = order.userId 
        this.productId = order.productId
        this.comment = order.comment
        this.evaluate = order.evaluate
        this.created_at = order.created_at || date
        this.updated_at = order.updated_at || date
    }
}
