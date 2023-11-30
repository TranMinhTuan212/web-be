import { Double, ObjectId } from "mongodb"
import internal from "stream"

export interface OrderReqbody {
    userId: ObjectId
    cartId: ObjectId
    payment: String
    address: String
    status: String

}
