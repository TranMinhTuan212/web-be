import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface ProductType{
    _id?: ObjectId
    name: string
    description: string
    price: Double
    quantity: Double
    sold_count: Double
    photo: string
    category_id: string
    created_at?: Date
    updated_at?: Date
}

export default class Product{
    _id?: ObjectId
    name: string
    description: string
    price: Double
    quantity: Double
    sold_count: Double
    photo: string
    category_id: string
    created_at?: Date
    updated_at?: Date

    constructor(product: ProductType){
        const date = new Date()
        this._id = product._id
        this.name = product.name || ''
        this.description = product.description
        this.price = product.price
        this.quantity = product.quantity
        this.sold_count = product.sold_count
        this.photo = product.photo
        this.category_id = product.category_id
        this.created_at = product.created_at || date
        this.updated_at = product.updated_at || date
    }
}
