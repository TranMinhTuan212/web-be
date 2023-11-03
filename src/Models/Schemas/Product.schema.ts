import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface ProductType{
    _id?: ObjectId
    name: string
    price: Double
    origin: string
    category_id: string
    description: string
    code: string
    discout: Double
    unit: string
    image: string
    status?: string
    quantity: Double
    created_at?: Date
    updated_at?: Date
}

export default class Product{
    _id?: ObjectId
    name: string
    price: Double
    origin: string
    category_id: string
    description: string
    code: string
    discout: Double
    unit: string
    image: string
    status?: string
    quantity: Double
    created_at?: Date
    updated_at?: Date

    constructor(product: ProductType){
        const date = new Date()
        this._id = product._id
        this.name = product.name || ''
        this.price = product.price
        this.origin = product.origin
        this.category_id = product.category_id
        this.description = product.description
        this.code = product.code
        this.discout = product.discout
        this.unit = product.unit
        this.image = product.image
        this.status = product.status || ''
        this.quantity = product.quantity
        this.created_at = product.created_at || date
        this.updated_at = product.updated_at || date
    }
}
