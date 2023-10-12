import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import productServices from '~/Services/products.services'
import { validate } from '~/Utils/validation'

export const createProductVadidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      },
      trim: true
    },
    price: {
      notEmpty: true,
      isInt: true,
      trim: true,
    },
    description: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 500
        }
      },
    },
    category_id: {
      notEmpty: true,
      isString: true,
    },
    quantity: {
      notEmpty: true,
      isInt: true,
    },
    // image: {
    //   isFile: true,
    //   isMimeType: ['image/jpeg', 'image/png'],
    //   isSize: {
    //     fileSize: { fileSize: 12 },
    //   },
    // },
  })
)
