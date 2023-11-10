import { Double } from 'mongodb'
import internal from 'stream'

export interface ProductReqbody {
    name: string
    description: string
    price: Double
    image: string
    category_id: string
    origin: string
    unit: string
    code: string
    discount: string
}
