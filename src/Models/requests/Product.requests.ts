import { Double } from "mongodb"
import internal from "stream"

export interface ProductReqbody {
    name: string
    price: Double
    description: string
    quantity: internal
    category_id: string
    image: string
    status: string
}
