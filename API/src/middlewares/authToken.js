import jwt from "jsonwebtoken";

import { keys } from "../config/keys";

function authToken(req, res, next) {
  if (req.query.token) {
    let token = req.query.token;

    jwt.verify(token, keys.SECRET_KEY, (e, data) => {
      if (e) {
        return res.status(400).json({ message: e.message });
      }

      req.user = data;
      next();
    });
  } else {
    res
      .status(401)
      .json({ message: "You don't have permissions to stay here :)" });
  }
}

export default authToken;
