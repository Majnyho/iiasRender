// controllers/noteController.js
const Note = require('../models/Note');

const noteController = {
  // Obtener todas las notas
  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.find();
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear una nueva nota
  createNote: async (req, res) => {
    const note = new Note({
      title: req.body.title,
      content: req.body.content
    });
    try {
      const newNote = await note.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Obtener una nota por su ID
  getNoteById: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (note == null) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      res.json(note);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Actualizar una nota existente
  updateNote: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (note == null) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      if (req.body.title != null) {
        note.title = req.body.title;
      }
      if (req.body.content != null) {
        note.content = req.body.content;
      }
      const updatedNote = await note.save();
      res.json(updatedNote);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  // Eliminar una nota
  deleteNote: async (req, res) => {
    try {
      const note = await Note.findById(req.params.id);
      if (note == null) {
        return res.status(404).json({ message: 'Nota no encontrada' });
      }
      await note.remove();
      res.json({ message: 'Nota eliminada' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

module.exports = noteController;
