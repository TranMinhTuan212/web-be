import { Double, ObjectId } from "mongodb"
import internal from "stream"

export interface OrderReqbody {
    orderCode: string
    completeAt: Date
    userId: string
    cost: Double
    image: string
    payment: Double
    reason: string
    address: string
    productId: string
    quantity: Double
}
