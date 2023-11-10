import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { CategoryReqbody } from '~/Models/requests/Category.requests'
import categoriesService from '~/Services/categories.services'

export const createCategoryController = async (req: Request<ParamsDictionary, any, CategoryReqbody>, res: Response) => {
  try {
    const category = await categoriesService.createCategory(req.body)

    if (category) {
      return res.status(200).json({
        message: 'Create product success'
      })
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}

export const getAllCategoryController = async (req: Request, res: Response) => {
  try {
    const data = await categoriesService.getAllCategories()

    return res.status(200).json({
      data,
      message: 'Get all cateories success'
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error'
    })
  }
}
