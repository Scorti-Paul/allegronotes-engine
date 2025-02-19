import { NoteModal } from "./../../database/schemas/notes";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "./../../controllers/notes";

const express = require("express");

const router = express?.Router();
router.get("/api/notes", (req: any, res: any) => getNotes(NoteModal, req, res));

router.get("/api/note", (req: any, res: any) =>
  getNoteById(NoteModal, req, res)
);

router.put("/api/note/update", updateNote);
router.post("/api/note/create", createNote);
router.delete("/api/note/delete/:id", deleteNote);

const noteRoutes = router;
export { noteRoutes };
