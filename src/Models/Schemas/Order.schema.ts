import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface OrderType{
    _id?: ObjectId
    order_code: string
    complete_at: Date
    user_id: string
    cost: Double
    photo: string
    payment: Double
    reason: string
    address: string
    product_id: string
    quantity: Double
    created_at?: Date
    updated_at?: Date
}

export default class Order{
    _id?: ObjectId
    order_code: string
    complete_at: Date
    user_id: string
    cost: Double
    photo: string
    payment: Double
    reason: string
    address: string
    product_id: string
    quantity: Double
    created_at?: Date
    updated_at?: Date

    constructor(order: OrderType){
        const date = new Date()
        this._id = order._id
        this.order_code = order.order_code || ''
        this.complete_at = order.complete_at || date
        this.user_id = order.user_id
        this.cost = order.cost
        this.photo = order.photo
        this.payment = order.payment
        this.reason = order.reason
        this.address = order.address
        this.product_id = order.product_id
        this.quantity = order.quantity
        this.created_at = order.created_at || date
        this.updated_at = order.updated_at || date
    }
}
