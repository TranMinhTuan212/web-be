import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface ProductType{
    _id?: ObjectId
    name: string
    description: string
    price: Double
    image: string
    category_id: string
    origin: string
    unit: string
    code: string
    discount: string
    created_at?: Date
    updated_at?: Date
}

export default class Product{
    _id?: ObjectId
    name: string
    description: string
    price: Double
    image: string
    category_id: string
    origin: string
    unit: string
    code: string
    discount: string
    created_at?: Date
    updated_at?: Date

    constructor(product: ProductType){
        const date = new Date()
        this._id = product._id
        this.name = product.name || ''
        this.description = product.description
        this.price = product.price
        this.image = product.image
        this.category_id = product.category_id
        this.origin = product.origin
        this.unit = product.unit
        this.code = product.code
        this.discount = product.discount
        this.created_at = product.created_at || date
        this.updated_at = product.updated_at || date
    }
}
