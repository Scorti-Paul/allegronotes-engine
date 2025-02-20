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

router.get("/api/notes/:id", (req: any, res: any) =>
  getNoteById(NoteModal, req, res)
);

router.put("/api/note/:id", updateNote);
router.post("/api/note", createNote);
router.delete("/api/note/:id", deleteNote);

const noteRoutes = router;
export { noteRoutes };
