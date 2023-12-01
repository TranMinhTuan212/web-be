import { Double, ObjectId } from "mongodb"
import internal from "stream"

export interface CommentReqbody {
    userId: ObjectId
    productId: ObjectId
    comment: String
    evaluate: Double

}
