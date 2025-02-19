import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../../controllers/category";
import { CategoryModel } from "../../database/schemas/category";

const express = require("express");

const router = express?.Router();

router.get("/api/categories", (req: any, res: any) =>
  getCategories(CategoryModel, req, res)
);

router.get("/api/category", (req: any, res: any) =>
  getCategoryById(CategoryModel, req, res)
);

router.put("/api/category/update", updateCategory);
router.post("/api/category/create", createCategory);
router.delete("/api/category/delete/:id", deleteCategory);

const categoryRoutes = router;
export { categoryRoutes };
