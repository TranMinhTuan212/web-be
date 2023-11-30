import databaseservice from './database.services'
import { ObjectId } from 'mongodb'
import { CartReqbody } from '~/Models/requests/Cart.requests'
import Cart from '~/Models/Schemas/Cart.schema'

class CartsService {
  async createCart(payload: CartReqbody, user_id: string) {
    const cart = await databaseservice.carts.insertOne(
      new Cart({
        ...payload,
        productId: new ObjectId(payload.productId), 
        userId: new ObjectId(user_id) 
      })
    )
    return cart.acknowledged

  }

  async getCartByUserId(user_id: string) {
    // const orders = await databaseservice.orders.find({ user_id: userId })
    const orders = await databaseservice.carts.aggregate([
      {
        $match: {
          userId: new ObjectId(user_id)
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: {
          path: '$product',
        }
      },
      {
        $lookup: {
          from: "categories",
          localField: "product.categoryId",
          foreignField: "_id",
          as: "category"
        }
      },
      {
        $unwind: {
          path: '$category',
        }
      },
      {
        $project: {
          _id: 1,
          quantity: 1,
          productId: "$product._id",
          productName: "$product.name",
          productPrice: "$product.price",
          productImage: "$product.image",
          productUnit: "$product.unit",
          productdiscount: "$product.discount",
          categoryName: "$category.name",
        }
      }
    ])

    return orders.toArray()
  }

  async getCartByCartId(cart_id: string) {
    const cart = await databaseservice.carts.findOne({ _id: new ObjectId(cart_id) })

    return cart
  }
  async getCartByObjectCartId(cart_id: ObjectId) {
    const cart = await databaseservice.carts.findOne({ _id: cart_id })
    // const cart = await databaseservice.carts.aggregate([
    //   {
    //     $match: {
    //       _id: cart_id
    //     }
    //   },
    //   // {
    //   //   $lookup: {
    //   //     from: "products",
    //   //     localField: "productId",
    //   //     foreignField: "_id",
    //   //     as: "product"
    //   //   }
    //   // },
    //   // {
    //   //   $unwind: {
    //   //     path: '$product',
    //   //   }
    //   // },
    //   // {
    //   //   $lookup: {
    //   //     from: "categories",
    //   //     localField: "product.categoryId",
    //   //     foreignField: "_id",
    //   //     as: "category"
    //   //   }
    //   // },
    //   // {
    //   //   $unwind: {
    //   //     path: '$category',
    //   //   }
    //   // },
    //   {
    //     $project: {
    //       _id: 1,
    //       quantity: 1,
    //       // productId: "$product._id",
    //       // productName: "$product.name",
    //       // productPrice: "$product.price",
    //       // productImage: "$product.image",
    //       // productUnit: "$product.unit",
    //       // productdiscount: "$product.discount",
    //       // categoryName: "$category.name",
    //     }
    //   }
    // ])
    return cart
  }

  async updateQuantity(id: string, updatedCartData: any) {
    const cartId = new ObjectId(id)    
    const cart = await databaseservice.carts.updateOne({ _id: cartId }, [
      {
        $set: {
          quantity: updatedCartData.quantity,
        }
      }
    ])

    // if (order.modifiedCount === 0 && order.acknowledged === false) {
    //   return []
    // }
    
    return cart.acknowledged
  }

  async deleteCart(cart_id: string) {
    const cart = await databaseservice.carts.findOneAndDelete({ _id: new ObjectId(cart_id) })
    return cart
  }

}
const cartsService = new CartsService()
export default cartsService

