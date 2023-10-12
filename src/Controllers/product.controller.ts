import { log } from 'console';
import { Request, Response, NextFunction } from 'express'
import Product from '~/Models/Schemas/Product.schema'
import databaseservice from '~/Services/database.services';
import productsService from '~/Services/products.services';
import { ParamsDictionary } from 'express-serve-static-core'
import { ProductReqbody } from '~/Models/requests/Product.requests'
import { SearchQuery } from '~/Models/requests/Search.requests';

export const createProductController = async (req: Request<ParamsDictionary, any, ProductReqbody>, res: Response) => {
    try {
        // const name = req.body.name
        // const price = req.body.price
        // const quantity = req.body.quantity
        // const image = req.body.image
        // const status = "WAITING_APPROVE"
        // const category_id = req.body.category_id        

        // if(!name || !price || !quantity || !category_id){
        //     return res.status(422).json({
        //         error: "Please fill in complete information"
        //     })
        // }

        // if(!image){
        //     return res.status(422).json({
        //         error: "The image is not in the correct format"
        //     })
        // }

        const product = await productsService.createProduct(req.body)

        if (product) {
            return res.status(200).json({
                message: "Create product success"
            })
        }
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const getAllProductsController = async (req: Request, res: Response) => {

    try {
        const products = await productsService.getAllProducts();
        if (products.length === 0) {
            return res.status(404).json({
                error: 'No products found'
            });
        }

        return res.status(200).json({
            products,
            message: 'Get all products success'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const getProductByKeyWordController = async (req: Request<ParamsDictionary, any, any, SearchQuery>, res: Response) => {
    try {
        // const  { name, description } = req.body; 
        // let product = null

        // if(keyWord === "" || keyWord === null || keyWord === undefined || status !== "ON_SALE"){
        //     product = await productsService.getAllProducts();   
        // return res.status(200).json({
        //     product,
        //     message: 'Get product success'
        // });
        // }

        // const querry = 

        // if()

        // const result = query

        const product = await productsService.getProductByWord(req.query.name);
        // if (status === "ON_SALE") {

        //     if (!product) {
        //         return res.status(404).json({
        //             error: 'Product not found'
        //         });
        //     }
        // }


        console.log(product);

        return res.status(200).json({
            product,
            message: 'Get product success'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const updateProductController = async (req: Request, res: Response) => {
    try {
        // const { id } = req.query._id; 
        const updatedProductData = req.query;

        const updatedProduct = await productsService.updateProduct(req.query._id, updatedProductData);

        if (!updatedProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        return res.status(200).json({
            updatedProduct,
            message: 'Product updated successfully'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};

export const deleteProductController = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await productsService.deletedProduct(req.body._id);

        if (!deletedProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        if (deletedProduct === true) {
            return res.status(200).json({
                message: 'Product deleted success'
            });
        }

    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
};