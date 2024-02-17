import express from "express";
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import session from 'express-session';
import * as path from 'path'

import { Pool } from 'pg';
import pgSession from 'connect-pg-simple';
import cookieParser from 'cookie-parser';

const sessionPool = require('pg').Pool

import indexRouter from './routers/IndexRouter'
import userRouter from './routers/UserRouter'
import productRouter from './routers/ProductRouter'
import cartRouter from './routers/CartRouter'

export const initialize = (config: any) => {
    // create express app
    const app = express()

    const pool = new Pool({
        user: config.db.username,
        password: config.db.password,
        host: config.db.host,
        port: 5432,
        database: config.db.database,
    });
    // Create a session store using connect-pg-simple
    const pgSessionStore = pgSession(session);

    app.use(function (req, res, next) {
        // res.header("Access-Control-Allow-Origin", "http://35.158.231.177:9000");                                                                                                   
        res.header("Access-Control-Allow-Origin", config.viewUrl);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });

    app.use(express.static(path.join(__dirname, 'uploads')));

    app.post('/status', (req: Request, res: Response) => {
        res.send({ message: "It works!" });
    });

    app.use(
        session({
            // key: 'sid',
            store: new pgSessionStore({
                pool,
                tableName: 'session', // Name of the table to store sessions
            }),
            secret: 'your-secret', // Replace with your own secret
            resave: false,
            saveUninitialized: false,
            cookie: { domain: '', secure: false }, // Set "secure: true" for HTTPS
        })
    );
    app.use(cookieParser());

    app.use(bodyParser.json())

    app.use((req: any, res: Response, next: Function) => {
        req.session.sid = 'UfOLvYjD6DhRfvpvKhZSPOxVLfgRz2Mz'
        return next()
    });

    app.use('/', indexRouter);
    app.use(['/user', '/users'], userRouter);
    app.use(['/product', '/products'], productRouter);
    app.use(['/cart', '/carts'], cartRouter);

  
    app.use((req: Request, res: Response, next: Function) => {
        return res.sendStatus(404)
    });


    return app;
}