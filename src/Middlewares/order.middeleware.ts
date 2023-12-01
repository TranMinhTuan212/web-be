import { checkSchema } from 'express-validator'
import productServices from '~/Services/products.services'
import { validate } from '~/Utils/validation'

export const createOrderVadidator = validate(
  checkSchema({
    payment: {
      notEmpty: true,
      isFloat: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 10
        }
      },
      errorMessage: 'Số lượng không được để trống, là số độ dài từ 1-10 ký tự',
      custom: {
        options: (value) => {
          if (/\s/.test(value)) {
            throw new Error('Giá không được chứa khoảng trắng')
          }
          return true
        }
      },
      isPositiveNumber: {
        errorMessage: 'Giá phải là số dương',
        custom: (value: number) => value > 0,
      },

    },
    cartId: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        },
      } ,
      custom: {
        options: (value) => {
          if (/\s/.test(value)) {
            throw new Error('Mã id không được chứa khoảng trắng')
          }
          return true
        }
      },
      trim: true,
      errorMessage: 'Mã sản phẩm không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    },
  })
)
