// models/Note.js
const mongoose = require('mongoose');

// Definir el esquema de la nota
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Crear el modelo 'Note' basado en el esquema
const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
