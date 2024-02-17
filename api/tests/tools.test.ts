import { describe, expect, test, jest } from '@jest/globals';
import { initialize } from './../src/app';
import supertest from 'supertest';
import { config } from '../src/config';
import tools from '../src/utils/tools';
import * as jwt from "jsonwebtoken"

const app = initialize(config)
const request = supertest(app)

describe("AutoSender - start function", () => {
    test("Check the test endpoint", async () => {
        const res = await request.post("/status");
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("It works!");
    })

    test("Check the calcProductPrice method", async () => {
        const price = tools.calcProductPrice(10, 3, 5)
        expect(price).toBe(112.5);
    })

    test("Check the isAuthorize middleware", async () => {
        const decoded = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.lbpDp5O0CUcakpdbOLawR4FDHoyv-jMcCjPcjEfYz9c', config.secretkey)
        expect(JSON.stringify(decoded)).toBe(JSON.stringify({ sub: '1234567890', name: 'John Doe', iat: 1516239022 }));
    })
})