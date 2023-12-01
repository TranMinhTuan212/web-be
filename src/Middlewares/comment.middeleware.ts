import { checkSchema } from 'express-validator'
import productServices from '~/Services/products.services'
import { validate } from '~/Utils/validation'

export const createCommentVadidator = validate(
  checkSchema({
    evaluate: {
      notEmpty: true,
      isFloat: true,
      trim: true,
     
      errorMessage: 'Số lượng không được để trống, là số',
      custom: {
        options: (value) => {
          if (/\s/.test(value)) {
            throw new Error('Đánh giá không được chứa khoảng trắng')
          }
          return true
        }
      },
      isPositiveNumber: {
        errorMessage: 'Đánh giá phải là từ 1 đến 5',
        custom: (value: number) => {
          return value >= 1 && value <= 5;
        },
      },

    },
    comment: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        },
      } ,
      trim: true,
      errorMessage: 'Bình luận không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    },
    productId: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      },
      custom: {
        options: (value) => {
          if (/\s/.test(value)) {
            throw new Error('Mã id sản phẩm không được chứa khoảng trắng')
          }
          return true
        }
      },
      errorMessage: 'Địa chỉ không được để trống, là chuỗi độ dài phải từ 1-100 ký tự',
    },
  })
)
