import { Response } from "express";

import { pool } from "../db";

import { AuthRequest } from "../middleware/authMiddleware";

export async function createRecord(
  req: AuthRequest,
  res: Response
) {
  try {
    const entity = req.params.entity;

    const data = req.body;

    const userId = req.userId;

    const result = await pool.query(
      `
      INSERT INTO records (
        entity_name,
        data,
        user_id
      )
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [entity, data, userId]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create record",
    });
  }
}

export async function bulkCreateRecords(
  req: AuthRequest,
  res: Response
) {
  try {
    const entity = req.params.entity;

    const records = req.body.records;

    const userId = req.userId;

    for (const record of records) {
      await pool.query(
        `
        INSERT INTO records (
          entity_name,
          data,
          user_id
        )
        VALUES ($1, $2, $3)
        `,
        [entity, record, userId]
      );
    }

    res.status(201).json({
      message:
        "Records imported successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Bulk import failed",
    });
  }
}

export async function getRecords(
  req: AuthRequest,
  res: Response
) {
  try {
    const entity = req.params.entity;

    const userId = req.userId;

    const result = await pool.query(
      `
      SELECT *
      FROM records
      WHERE entity_name = $1
      AND user_id = $2
      ORDER BY created_at DESC
      `,
      [entity, userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch records",
    });
  }
}