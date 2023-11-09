import { Double } from "mongodb"
import internal from "stream"

export interface ProductReqbody {
    name: string
    description: string
    price: Double
    quantity: Double
    sold_count: Double
    photo: string
    category_id: string
}
