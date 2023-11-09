import { Double, ObjectId } from "mongodb"
import internal from "stream"

export interface OrderReqbody {
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
}
