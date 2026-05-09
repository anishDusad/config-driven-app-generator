import express from "express";

import {
  createRecord,
  getRecords,
  bulkCreateRecords,
} from "../controllers/recordController";

import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/:entity",
  authenticate,
  createRecord
);

router.post(
  "/:entity/bulk",
  authenticate,
  bulkCreateRecords
);

router.get(
  "/:entity",
  authenticate,
  getRecords
);

export default router;