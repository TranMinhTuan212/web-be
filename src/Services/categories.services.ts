import User from '~/Models/Schemas/User.schema'
import databaseservice from './database.services'
import { RegisterReqbody } from '~/Models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { ProductReqbody } from '~/Models/requests/Product.requests'
import Product from '~/Models/Schemas/Product.schema'
import { SearchQuery } from '~/Models/requests/Search.requests'
import { CategoryReqbody } from '~/Models/requests/Category.requests'
import Category from '~/Models/Schemas/Category.shema'

class CategoriesService {
  async createCategory(payload: CategoryReqbody) {
    const category = await databaseservice.categories.insertOne(
      new Category({
        ...payload
      })
    )
    return category
  }

  async getAllCategories() {
    const products = await databaseservice.categories.find()
    return products.toArray()
  }
}
const categoriesService = new CategoriesService()
export default categoriesService
