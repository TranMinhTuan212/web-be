import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface ProductType{
    _id?: ObjectId
    name: string
    price: Double
    description: string
    quantity: internal
    category_id: string
    image: string
    status: string
    created_at?: Date
    updated_at?: Date
}

export default class Product{
    _id?: ObjectId
    name: string
    price: Double
    description: string
    quantity: internal
    image: string
    status: string
    category_id?: string
    created_at?: Date
    updated_at?: Date

    constructor(product: ProductType){
        const date = new Date()
        this._id = product._id
        this.name = product.name || ''
        this.price = product.price
        this.description = product.description
        this.quantity = product.quantity
        this.status = product.status
        this.image = product.image
        this.category_id = product.category_id
        this.created_at = product.created_at || date
        this.updated_at = product.updated_at || date
    }
}
