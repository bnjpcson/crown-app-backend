import bcrypt from "bcryptjs";
import db from "../db/db.js";

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(process.env.SALT_ROUNDS); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword); // Compare plain and hashed passwords
    return isMatch;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw error;
  }
};

export const authAccount = (req, res) => {
  const { email, password } = req.body;
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const registerAccount = async (req, res) => {
  const trx = await db.transaction(); // Start a transaction
  const hashedPassword = await hashPassword(req.body.password);
  try {
    // Perform multiple queries within the transaction
    await trx("users").insert({ ...req.body, password: hashedPassword });
    await trx.commit(); // Commit the transaction
    console.log("User inserted successfully");
    res.status(200).json(req.body);
  } catch (error) {
    await trx.rollback(); // Rollback the transaction if something goes wrong
    console.error("Error inserting user:", error);
    res.sendStatus(500);
  } finally {
    await db.destroy(); // Close the database connection
  }
};