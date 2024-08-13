import bcryptjs from "bcryptjs";

export const authAccount = (req, res) => {
  const { email, password } = req.body;
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
