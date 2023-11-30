import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface CartType{
    _id?: ObjectId
    userId: ObjectId
    productId: ObjectId
    quantity: Double
    created_at?: Date
    updated_at?: Date
}

export default class Cart{
    _id?: ObjectId
    userId: ObjectId
    productId: ObjectId
    quantity: Double
    created_at?: Date
    updated_at?: Date

    constructor(order: CartType){
        const date = new Date()
        this._id = order._id
        this.userId = order.userId
        this.productId = order.productId
        this.quantity = order.quantity
        this.created_at = order.created_at || date
        this.updated_at = order.updated_at || date
    }
}
