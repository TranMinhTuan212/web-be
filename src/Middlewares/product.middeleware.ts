import { checkSchema } from 'express-validator'
import productServices from '~/Services/products.services'
import { validate } from '~/Utils/validation'

const isJpegFileName = (fileName: string) => {
  const regex = /^\.(jpg|jpeg)$/i;
  return regex.test(fileName);
};

export const createProductVadidator = validate(
  checkSchema({
    // name: {
    //   notEmpty: true,
    //   isString: true,
    //   isLength: {
    //     options: {
    //       min: 1,
    //       max: 255
    //     },
       
    //   } ,
    //   trim: true,
    //   errorMessage: 'Không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    // },
    // description: {
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
    // price: {
    //   notEmpty: true,
    //   isFloat: true,
    //   trim: true,
    //   errorMessage: 'Không được để trống, là số',

    // },
    // discount: {
    //   notEmpty: true,
    //   isFloat: true,
    //   trim: true,
    //   isLength: {
    //     options: {
    //       min: 1,
    //       max: 500
    //     }
    //   },
    //   errorMessage: 'Không được để trống, là số từ 1-100',

    // },
    
    // category_id: {
    //   notEmpty: true,
    //   isString: true,
    //   trim: true,
    //   errorMessage: 'Không được để trống',

    // },
    // unit: {
    //   notEmpty: true,
    //   isString: true,
    //   isLength: {
    //     options: {
    //       min: 1,
    //       max: 255
    //     },
       
    //   } ,
    //   trim: true,
    //   errorMessage: 'Không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    // },
    // origin: {
    //   notEmpty: true,
    //   isString: true,
    //   isLength: {
    //     options: {
    //       min: 1,
    //       max: 255
    //     },
       
    //   } ,
    //   trim: true,
    //   errorMessage: 'Không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    // },
    // code: {
    //   notEmpty: true,
    //   isString: true,
    //   isLength: {
    //     options: {
    //       min: 1,
    //       max: 255
    //     },
       
    //   } ,
    //   trim: true,
    //   errorMessage: 'Không được để trống, là chuỗi độ dài phải từ 1-255 ký tự',
    // },

  })
)
