import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface OrderType{
    _id?: ObjectId
    orderCode: string
    completeAt: Date
    userId: string
    cost: Double
    image: string
    payment: Double
    reason: string
    address: string
    productId: ObjectId
    quantity: Double
    created_at?: Date
    updated_at?: Date
}

export default class Order{
    _id?: ObjectId
    orderCode: string
    completeAt: Date
    userId: string
    cost: Double
    image: string
    payment: Double
    reason: string
    address: string
    productId: ObjectId
    quantity: Double
    created_at?: Date
    updated_at?: Date

    constructor(order: OrderType){
        const date = new Date()
        this._id = order._id
        this.orderCode = order.orderCode || ''
        this.completeAt = order.completeAt || date
        this.userId = order.userId
        this.cost = order.cost
        this.image = order.image
        this.payment = order.payment
        this.reason = order.reason
        this.address = order.address
        this.productId = order.productId
        this.quantity = order.quantity
        this.created_at = order.created_at || date
        this.updated_at = order.updated_at || date
    }
}
