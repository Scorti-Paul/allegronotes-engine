import {
  createTag,
  deleteTag,
  getCategories,
  getTagById,
  updateTag,
} from "../../controllers/tag";
import { TagModel } from "../../database/schemas/tag";

const express = require("express");

const router = express?.Router();

router.get("/api/tags", (req: any, res: any) =>
  getCategories(TagModel, req, res)
);

router.get("/api/tag", (req: any, res: any) =>
  getTagById(TagModel, req, res)
);

router.put("/api/tag/update", updateTag);
router.post("/api/tag/create", createTag);
router.delete("/api/tag/delete/:id", deleteTag);

const tagRoutes = router;
export { tagRoutes };
