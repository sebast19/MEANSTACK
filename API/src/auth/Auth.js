import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { keys } from "../config/keys";

import User from "../models/User";

class Auth {
  static async login(req, res) {
    const { email, pass } = req.body;

    try {
      const user = await User.find({ email });
      const compare = await bcrypt.compare(pass, user[0].password);

      if (!compare) {
        res.status(400).json({
          success: false,
          message: "username or password incorrect"
        });
        return;
      }

      const payload = {
        fname: user[0].firstName,
        lname: user[0].lastName,
        email: user[0].email,
        role: user[0].role,
        created_at: user[0].created_at
      };

      const token = jwt.sign(payload, keys.SECRET_KEY, {
        expiresIn: "4h"
      });

      res.status(200).json({
        data: payload,
        token
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}

export default Auth;
