import { log } from 'console'
import { Request, Response, NextFunction } from 'express'
import Order from '~/Models/Schemas/Order.schema'
import databaseservice from '~/Services/database.services'
import commentService from '~/Services/comment.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { OrderReqbody } from '~/Models/requests/Order.requests'
import {
  TokenPayload,

} from '~/Models/requests/User.requests'
import cartsService from '~/Services/carts.services'
import { ObjectId } from 'mongodb'
import productsService from '~/Services/products.services'

export const createCommentController = async (req: Request<ParamsDictionary>, res: Response) => {
  try {
    const { user_id } = req.decode_authorization as TokenPayload

    const comment = await commentService.createComment(req?.body, user_id)

    if (comment === false) {
      return res.status(404).json({
        message: 'Bình luận thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Bình luận thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}

export const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const idComment = req.body?._id
    const { user_id } = req.decode_authorization as TokenPayload

    const comment = await commentService.getCommentId(idComment, user_id)

    if (!comment) {
      return res.status(404).json({
        message: 'Bình luận này không phải của bạn !'
      })
    }

    const deletedComment = await commentService.deleteComment(idComment)

    if (!deletedComment) {
      return res.status(404).json({
        message: 'Xóa bình luận thất bại !'
      })
    }

    return res.status(200).json({
      message: 'Xóa bình luận thành công'
    })
  } catch (message) {
    return res.status(500).json({
      message: 'Lỗi, vui lòng thử lại sau !'
    })
  }
}


