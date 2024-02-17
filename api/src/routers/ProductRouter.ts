import { Router } from "express";
import type { Request, Response } from "express";
// import { productController } from "controllers/user.controller";
import { ProductController } from "./../controllers/ProductController";
import { Middleware } from "../controllers/Middleware";

const router = Router();
const productController = new ProductController();
const middleware = new Middleware();

router.post('/', middleware.isAuthorize, productController.get);
router.post('/update', middleware.isAuthorize, productController.update);
router.post('/photo/update', middleware.isAuthorize, productController.updatePhoto);
// router.post('/edit', productController.edit);
// router.post('/:id', productController.edit);
//iki
// router.post('/users', productController.delete);

// router.post('/users', (req: Request, res: Response) => {
//   const newUser: User = req.body;
//   users.push(newUser);
//   res.json(newUser);
// });

// router.put('/users/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);

//   const aa: User = { name: 'df', email: 'df', id: 2 }
//   const updatedUser: User = req.body;
//   users = users.map((user) => (user.id === id ? updatedUser : user));
//   res.json(aa);
// });

// router.delete('/users/:id', (req: Request, res: Response) => {
//   const id = parseInt(req.params.id);
//   users = users.filter((user) => user.id !== id);
//   res.sendStatus(204);
// });


export default router;