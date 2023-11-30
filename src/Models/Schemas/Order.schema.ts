import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface OrderType{
    _id?: ObjectId
    userId: ObjectId
    cartId: ObjectId
    payment: String
    address: String
    status: String
    created_at?: Date
    updated_at?: Date
}

export default class Order{
    _id?: ObjectId
    userId: ObjectId
    cartId: ObjectId
    payment: String
    address: String
    status: String

    created_at?: Date
    updated_at?: Date

    constructor(order: OrderType){
        const date = new Date()
        this._id = order._id
        this.userId = order.userId 
        this.cartId = order.cartId
        this.payment = order.payment
        this.address = order.address
        this.status = order.status

        this.created_at = order.created_at || date
        this.updated_at = order.updated_at || date
    }
}
