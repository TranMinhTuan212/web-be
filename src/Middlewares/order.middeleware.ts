import { checkSchema } from 'express-validator'
import productServices from '~/Services/products.services'
import { validate } from '~/Utils/validation'

export const createOrderVadidator = validate(
  checkSchema({
    orderCode: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        },
       
      } ,
      trim: true,
      errorMessage: 'Mã không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    },
    // userId: {
    //   notEmpty: true,
    //   isString: true,
    //   isLength: {
    //     options: {
    //       min: 1,
    //       max: 500
    //     }
    //   },
    //   errorMessage: 'Không được để trống, là chuỗi độ dài phải từ 1-500 ký tự',
    // },
    payment: {
      notEmpty: true,
      isFloat: true,
      trim: true,
      errorMessage: 'Tổng tiền sản phẩm không được để trống, là số',
    },
    reason: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        },
      } ,
      trim: true,
      errorMessage: 'Mô tả không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    },
    address: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        },
      } ,
      trim: true,
      errorMessage: 'Địa chỉ không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    },
    productId: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        },
      } ,
      trim: true,
      errorMessage: 'Mã sản phẩm không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    },
    quantity: {
      notEmpty: true,
      isFloat: true,
      trim: true,
      errorMessage: 'Số lượng không được để trống, là số',
    },
  })
)
