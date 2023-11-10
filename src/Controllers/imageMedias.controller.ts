import { NextFunction, Request, Response } from 'express'
import path, { join } from 'path'
import { TokenPayload } from '~/Models/requests/User.requests'
import databaseservice from '~/Services/database.services'
import mediasService from '~/Services/medias.services'
import usersService from '~/Services/users.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decode_authorization as TokenPayload
  const url = await usersService.handleUploadSingImage(req, user_id)
  // const data = await handlerUploadImage(req)
  return res.status(200).json({
    message: 'Lấy ảnh thành công',
    result: url
  })
}
console.log(path.resolve('uploads'))
