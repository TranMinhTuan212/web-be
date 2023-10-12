import { Double } from "mongodb"
import internal from "stream"

export interface ProductReqbody {
    name: string
    price: Double
    origin: string
    code: string
    discout: Double
    unit: string
    description: string
    quantity: internal
    category_id: string
    image: string
    status: string
}
