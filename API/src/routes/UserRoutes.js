import { Router } from "express";

import UserController from "../controllers/UserController";
import authToken from "../middlewares/authToken";

class UserRoutes {
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/search/:email", UserController.getUser);
    this.router.get("/", UserController.getUsers);
    this.router.get(
      "/desactivated",
      authToken,
      UserController.getUsersDesactivated
    );
    this.router.post("/", UserController.createUser);
    this.router.put("/:id", authToken, UserController.updateUser);
    this.router.delete("/:id", authToken, UserController.deleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
