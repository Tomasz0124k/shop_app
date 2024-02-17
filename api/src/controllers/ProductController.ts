import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Product } from "../entity/Product"
import { User } from "../entity/User"
import Jimp = require("jimp")
import tools from "../utils/tools"

export class ProductController {

    public productRepository = AppDataSource.getRepository(Product)

    async get(request: Request, response: Response, next: NextFunction) {
        let productRepository = AppDataSource.getRepository(Product)

        const id = parseInt(request.body.id)

        let products: any = []
        if (id)
            products = await productRepository.findOne({
                where: { id }
            })
        else
            products = await productRepository.find()

        return response.send(products)
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let productRepository = AppDataSource.getRepository(Product)
        const {
            name,
            description,
            price,
            image
        } = request.body;

        const product = Object.assign(new Product(), {
            name,
            description,
            price,
            image
        })
        await productRepository.save(product)
        return response.status(200).send({ msg: 'Zapisano pomyślnie' })
    }

    async updatePhoto(request: Request, response: Response, next: NextFunction) {
        let productRepository = AppDataSource.getRepository(Product)
        try {
            const timestamp = Date.now()
            const imageData = request.body.image; // Extract Base64-encoded image data from request body
            const decodedImage = Buffer.from(imageData, 'base64'); // Decode the image data
            const path = process.env.dirname + `/public/uploads/product_${request.body.id}_${timestamp}.png`;
            await tools.saveImage(path, decodedImage)

            Jimp.read(path)
                .then((lenna) => {
                    return lenna
                        .resize(256, Jimp.AUTO) // resize
                        .quality(30) // set JPEG quality
                        .write(path); // save
                })
                .catch((err) => {
                    console.error(err);
                });

            // const product = Object.assign(new Product(), {
            //     name,
            //     description,
            //     price,
            //     image
            // })
            await productRepository.save({
                id: request.body.id,
                image: path
            })
            return response.status(200).send({ msg: 'Zapisano pomyślnie' })
        }
        catch (err) { console.log(err) }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let productToRemove = await this.productRepository.findOneBy({ id })

        if (!productToRemove) {
            return "this product not exist"
        }

        await this.productRepository.remove(productToRemove)

        return "product has been removed"
    }

}