import { Request, Response } from "express";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import dotenv from "dotenv";

import { pool } from "../db";

dotenv.config();

export async function signup(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error:
          "Email and password required",
      });
    }

    const existingUser =
      await pool.query(
        `
        SELECT * FROM users
        WHERE email = $1
        `,
        [email]
      );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING id, email
      `,
      [email, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Signup failed",
    });
  }
}

export async function login(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT * FROM users
      WHERE email = $1
      `,
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Login failed",
    });
  }
}