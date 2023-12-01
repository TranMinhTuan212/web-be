import { ObjectId } from 'mongodb'

interface LikeProduct {
  _id?: ObjectId
  product_id: ObjectId
  user_id: ObjectId
  created_at?: Date
}
export default class likeProduct {
  _id?: ObjectId
  product_id: ObjectId
  user_id: ObjectId
  created_at?: Date
  constructor(likeProducts: LikeProduct) {
    const date = new Date()
    this._id = likeProducts._id
    this.product_id = likeProducts.product_id
    this.user_id = likeProducts.user_id
    this.created_at = likeProducts.created_at || date
  }
}
