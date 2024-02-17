import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { config } from "../config"


export class Middleware {

    async isAuthorize(request: any, response: Response, next: NextFunction) {
        const token = request.get("Authorization").split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, config.secretkey);
        } catch (err) {
            // console.log(err)
            return response.status(403).json({ status: 403, err: true, message: 'Brak autoryzacji - nieprawidłowy token' });
        };
        response.locals.user = decodedToken.user
        return next()
    }

}