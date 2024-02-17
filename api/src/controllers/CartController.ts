import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Cart } from "../entity/Cart"
import { Product } from "../entity/Product"
import { User } from "../entity/User"
import Jimp = require("jimp")
import tools from "../utils/tools"
import moment from "moment"
import { IsNull, Not } from "typeorm"

interface prod {
    id: number,
    userAmount: number,
    period: number
}

export class CartController {

    public cartRepository = AppDataSource.getRepository(Cart)

    async get(request: Request, response: Response, next: NextFunction) {
        let cartRepository = AppDataSource.getRepository(Cart)
        let productRepository = AppDataSource.getRepository(Product)

        let carts: any = []
        if (!request.body.list)
            carts = await cartRepository.findOne({
                where: {
                    user: response.locals.user.id,
                    payment_date: request.body.payed ? Not(IsNull()) : IsNull()
                }
            })
        else
            carts = await cartRepository.find({
                where: {
                    user: response.locals.user.id,
                    payment_date: request.body.payed ? Not(IsNull()) : IsNull()
                }
            })

        if (carts?.id) {
            carts.totalPrice = 0;
            for (let p of carts.orderDetails.products) {
                let product = await productRepository.findOne({ where: { id: p.id } })
                product.price = tools.calcProductPrice(product.price, p.usersAmount, p.period)
                carts.totalPrice += product.price
                p = Object.assign(p, product)
            }
        }
        if (carts?.length > 0) {
            for (let cart of carts) {
                cart.totalPrice = 0;
                for (let p of cart.orderDetails.products) {
                    let product = await productRepository.findOne({ where: { id: p.id } })
                    product.price = tools.calcProductPrice(product.price, p.usersAmount, p.period)
                    cart.totalPrice += product.price

                    p = Object.assign(p, product)
                }
            }
        }
        return response.send(carts || [])
    }

    async update(request: Request, response: Response, next: NextFunction) {
        let cartRepository = AppDataSource.getRepository(Cart)
        const {
            product,
            user,
            price,
            orderDetails
        } = request.body;

        const cart = Object.assign(new Cart(), {
            date: moment().format('YYYY-MM-DD HH:mm'),
            product,
            user,
            price,
            orderDetails
        })
        await cartRepository.save(cart)
        return response.status(200).send({ msg: 'Zapisano pomyślnie' })
    }

    async pay(request: Request, response: Response, next: NextFunction) {
        let cartRepository = AppDataSource.getRepository(Cart)

        const cart = Object.assign(new Cart(), {
            id: request.body.id,
            payment_date: moment().format('YYYY-MM-DD HH:mm'),
            date: moment().format('YYYY-MM-DD HH:mm')
        })

        await cartRepository.save(cart)
        return response.status(200).send({ msg: 'Zapisano pomyślnie' })
    }


    async updateProduct(request: Request, response: Response, next: NextFunction) {
        let cartRepository = AppDataSource.getRepository(Cart)

        const {
            product,
            user,
            price,
            orderDetails
        } = request.body;

        let activeCart = await cartRepository.findOne({
            where: {
                user: response.locals.user.id,
                payment_date: IsNull()
            }
        })

        if (activeCart) { //jeżeli jest już koszyk to dodaj tylko produkt
            await cartRepository.save(Object.assign(new Cart(), {
                id: activeCart.id,
                orderDetails: { ...activeCart.orderDetails, products: [...activeCart.orderDetails.products, product] }
            }))
        }
        else {
            const cart = Object.assign(new Cart(), {
                date: moment().format('YYYY-MM-DD HH:mm'),
                user,
                price,
                orderDetails: { products: [product] }
            })
            await cartRepository.save(cart)
        }



        return response.status(200).send({ msg: 'Zapisano pomyślnie' })
    }

    async getProductsAmount(request: Request, response: Response, next: NextFunction) {
        let cartRepository = AppDataSource.getRepository(Cart)

        // const id = parseInt(request.body.id)
        let cart: any = []
        cart = await cartRepository.findOne({
            where: { user: response.locals.user.id, payment_date: IsNull() }
        })
        let amount = cart?.orderDetails?.products?.length || 0

        return response.send({ amount })
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let CartToRemove = await this.cartRepository.findOneBy({ id })

        if (!CartToRemove) {
            return "this Cart not exist"
        }

        await this.cartRepository.remove(CartToRemove)

        return "Cart has been removed"
    }

}