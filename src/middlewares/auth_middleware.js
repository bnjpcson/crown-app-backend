import db from "../db/db.js";

export const registerMiddleware = async (req, res, next) => {
  const { first_name, last_name, username, password, email } = req.body;

  let errors = {};

  if (first_name == "") {
    errors.first_name = "First Name is required";
  }
  if (last_name == "") {
    errors.last_name = "Last Name is required";
  }
  if (username == "") {
    errors.username = "Username is required";
  }
  if (password == "") {
    errors.password = "Password is required";
  }
  if (email == "") {
    errors.email = "Email is required";
  }

  if (Object.keys(errors).length == 0) {
    try {
      const user = await db("users")
        .select("*")
        .where("username", username)
        .orWhere("email", email)
        .first();

      if (user) {
        if (user.email == email) {
          errors.email = "Email already existing!";
        }
        if (user.username == username) {
          errors.username = "Username already existing!";
        }
        res.status(400).json(errors);
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json(errors);
  }
};
