import { Note } from "../models/note.model.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user.id
    });

    res.status(201).json({ message: "Note created", note });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndUpdate(
      { _id: id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note updated", note });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
