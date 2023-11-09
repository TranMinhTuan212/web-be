import { ObjectId } from "mongodb";

interface CategoryType {
    _id?: ObjectId
    category_name: string
    category_type: string
    category_description: string
}

export default class Category {
    _id?: ObjectId
    category_name: string
    category_type: string
    category_description: string

    constructor(category: CategoryType){
        this._id = category._id
        this.category_name = category.category_name
        this.category_type = category.category_type
        this.category_description = category.category_description
    }
}

