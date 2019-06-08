/**
 * Module Dependecies or files.
 */
import User from "../models/User";

/* Class for manage all HTTP Request for Model user */
class UserController {
  /*
   * Method to get users that macth with the email received from client
   * This method use async/await for asynchronus Request
   *
   * @param Request Param: email, to find in database the user with that email
   * @param (Optional) Request Query: From, this is the number of what register return to client
   * @return HTTP Response: return the users that match with the param.
   */
  static async getUser(req, res) {
    let search = req.params.email;
    let regex = new RegExp(search, "i");

    let from = req.query.from || 0;
    from = Number(from);

    try {
      const usersFinded = await User.find(
        { email: regex, status: true },
        "-password"
      )
        .skip(from)
        .limit(6);

      const count = await User.countDocuments(
        User.find({ email: regex, status: true })
      );

      if (usersFinded.length === 0) {
        res.status(204).json({ message: "no content" });
      } else {
        res.status(200).json({ data: usersFinded, total: count });
      }
    } catch (e) {
      res
        .status(500)
        .json({ error: e, message: "An internal error has been ocurred" });
    }
  }

  /*
   * Method to get all users from DB
   * This method use async/await for asynchronus Request
   *
   * @param (Optional) Request Query: From, this is the number of what register return to client
   * @return HTTP Response: return an array of all users registered.
   */
  static async getUsers(req, res) {
    let from = req.query.from || 0;
    from = Number(from);

    try {
      const users = await User.find({ status: true }, "-password")
        .skip(from)
        .limit(6)
        .sort({ created_at: "desc" });

      const count = await User.countDocuments({});
      res.status(200).json({ data: users, total: count });
    } catch (e) {
      res
        .status(500)
        .json({ error: e, message: "An internal error has been ocurred" });
    }
  }

  /*
   * Method to get all users that has been desactivated from DB
   * This method use async/await for asynchronus Request
   *
   * @param (Optional) Request Query: From, this is the number of what register return to client
   * @return HTTP Response: return an array of all users registered.
   */
  static async getUsersDesactivated(req, res) {
    if (req.user.role != "ROLE_ADMIN") {
      return res
        .status(401)
        .json({ message: "You don't have permissions to do this." });
    }

    let from = req.query.from || 0;
    from = Number(from);

    try {
      const users = await User.find({ status: false }, "-password")
        .skip(from)
        .limit(6)
        .sort({ created_at: "desc" });

      const count = await User.countDocuments(User.find({ status: false }));
      res.status(200).json({ data: users, total: count });
    } catch (e) {
      res
        .status(500)
        .json({ error: e, message: "An internal error has been ocurred" });
    }
  }

  /*
   * Method to create a new user from DB
   * This method use async/await for asynchronus Request
   *
   * @param firstName: string, this is the first name of user.
   * @param lastName: string, this is the last name of user.
   * @param email: string & unique, this is the email of user and must be unique.
   * @param password: string, password of user, this will be encrypted.
   * @param (Optional) image: string, url of image to save in database.
   * @param (Optional) status: boolean, this change the status of user, true user active, false user inactive.
   *
   *
   * @return HTTP Response: return the data of user created.
   */
  static async createUser(req, res) {
    const newUser = new User(req.body);

    try {
      const user = await newUser.save();
      user.password = ":)";
      res.status(200).json({ success: true, data: user });
    } catch (e) {
      if (e.errors.email) {
        res.status(400).json({ message: "This email is already in use." });
      } else if (e.errors.role) {
        res.status(400).json({
          message: "The format of field Role is invalid.",
          options:
            "The valid options are: ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER"
        });
      } else {
        res
          .status(500)
          .json({ error: e, message: "An internal error has been ocurred" });
      }
    }
  }

  /*
   * Method to update an user from DB
   * This method use async/await for asynchronus Request
   *
   * @param Request Params: id, the unique id of each user in database. the id to find
   *  the user to update
   *
   * @param Request Body: data, the data to set new data of user.
   *
   * @return HTTP Response: return the new user updated.
   */
  static async updateUser(req, res) {
    if (req.user.role != "ROLE_ADMIN") {
      return res
        .status(401)
        .json({ message: "You don't have permissions to do this." });
    }

    const { id } = req.params;

    try {
      const userUpdated = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true
      });

      userUpdated.password = ":)";

      res.status(202).json({
        message: "The user has been updated",
        data: userUpdated
      });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Invalid ID, please send a valid ID of user." });
    }
  }

  /*
   * Method to desactive and user on DB.
   * This method use async/await for asynchronus Request
   *
   * @param Request Params: id, the of user to Desactive in DB.
   *
   * @return HTTP Response; return a json width message.
   */
  static async deleteUser(req, res) {
    if (req.user.role != "ROLE_ADMIN") {
      return res
        .status(401)
        .json({ message: "You don't have permissions to do this." });
    }

    const { id } = req.params;

    try {
      await User.findOneAndUpdate({ _id: id }, { status: false });
      res.status(200).json({
        message: "The user has been desactivated"
      });
    } catch (e) {
      res.status(500).json({ message: "an internal error has been ocurred" });
    }
  }
}

export default UserController;
