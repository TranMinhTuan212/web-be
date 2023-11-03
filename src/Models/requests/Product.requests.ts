import { Double } from "mongodb"
import internal from "stream"

export interface ProductReqbody {
    name: string
    price: Double
    origin: string
    category_id: string
    description: string
    code: string
    discout: Double
    unit: string
    image: string
    status: string
    quantity: Double
}
