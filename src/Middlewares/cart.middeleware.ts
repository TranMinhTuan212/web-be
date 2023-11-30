import { checkSchema } from 'express-validator'
import productServices from '~/Services/products.services'
import { validate } from '~/Utils/validation'

const isJpegFileName = (fileName: string) => {
  const regex = /^\.(jpg|jpeg)$/i;
  return regex.test(fileName);
};

export const createCartVadidator = validate(
  checkSchema({
    quantity: {
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
  })
)

