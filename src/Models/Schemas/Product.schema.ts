import { Double, ObjectId } from 'mongodb'
import internal from 'stream'

interface ProductType{
    _id?: ObjectId
    name: string
    description: string
    price: Double
    image: string
    categoryId: ObjectId
    origin: string
    unit: string
    code: string
    discount: Double
    tableName: string
    version: number
    created_at?: Date
    updated_at?: Date
}

export default class Product{
    _id?: ObjectId
    name: string
    description: string
    price: Double
    image: string
    categoryId: ObjectId
    origin: string
    unit: string
    code: string
    discount: Double
    tableName: string
    version: number
    created_at?: Date
    updated_at?: Date

    constructor(product: ProductType){
        const date = new Date()
        this._id = product._id
        this.name = product.name || ''
        this.description = product.description
        this.price = product.price
        this.image = product.image
        this.categoryId = product.categoryId
        this.origin = product.origin
        this.unit = product.unit
        this.code = product.code
        this.discount = product.discount
        this.tableName = product.tableName
        this.version = product.version
        this.created_at = product.created_at || date
        this.updated_at = product.updated_at || date
    }
}
