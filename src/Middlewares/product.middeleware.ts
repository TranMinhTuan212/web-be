import { checkSchema } from 'express-validator'
import productServices from '~/Services/products.services'
import { validate } from '~/Utils/validation'

const isJpegFileName = (fileName: string) => {
  const regex = /^\.(jpg|jpeg)$/i;
  return regex.test(fileName);
};

export const createProductVadidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 50
        },
       
      } ,
      trim: true,
      errorMessage: 'Tên sản phẩm không được để trống, là chuỗi độ dài phải từ 1-50 ký tự',
    },
    description: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      },
      errorMessage: 'Mô tả không được để trống, là chuỗi độ dài phải từ 1-100 ký tự',

    },
    price: {
      notEmpty: true,
      isFloat: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 10
        }
      },
      errorMessage: 'Giá không được để trống, là số độ dài từ 1-10 ký tự',

    },
    discount: {
      notEmpty: true,
      isFloat: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 10
        }
      },
      errorMessage: 'Chiết khấu không được để trống, là số từ 1-100',

    },
    unit: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 50
        },
       
      } ,
      trim: true,
      errorMessage: 'Đơn vị không được để trống, là chuỗi độ dài phải từ 1-50 ký tự',
    },
    origin: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 50
        },
       
      } ,
      trim: true,
      errorMessage: 'Xuất xứ không được để trống, là chuỗi độ dài phải từ 1-50 ký tự',
    },
    code: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 50
        },
       
      } ,
      trim: true,
      errorMessage: 'Mã code không được để trống, là chuỗi độ dài phải từ 1-50 ký tự',
    },

  })
)
