import { Double, ObjectId } from "mongodb"
import internal from "stream"

export interface CartReqbody {
    productId: ObjectId
    quantity: Double
}
