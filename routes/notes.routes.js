import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote
} from "../controllers/notes.controller.js";

const router = express.Router();

router.post("/create", auth, createNote);
router.get("/", auth, getNotes);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);

export default router;
