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
          max: 255
        }
      },
      trim: true
    },
    description: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 2550
        }
      },
    },
    price: {
      notEmpty: true,
      isFloat: true,
      trim: true,
    },
    quantity: {
      notEmpty: true,
      isFloat: true,
      trim: true,
    },
    sold_count: {
      notEmpty: true,
      isFloat: true,
      trim: true,
    },
    photo: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        }
      },
      trim: true
    },
    category_id: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 1,
          max: 255
        }
      },
      trim: true
    },


    // image: {
    //   custom: (image: string) => {
    //     if (!isJpegFileName(image)) {
    //       throw new Error('Image must be a JPEG file');
    //     }
    //     return true;
    //   },
    // },


  })
)
