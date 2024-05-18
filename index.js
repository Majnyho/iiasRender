// index.js
const express = require('express');
const mongoose = require('mongoose');
const noteController = require('./controllers/noteController');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/notas', {
 
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch(err => {
  console.error('Error al conectar a MongoDB', err);
});

// Middleware para manejar datos JSON
app.use(express.json());

// Configuración para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para las operaciones CRUD sobre las notas
app.get('/api/notes', noteController.getAllNotes);
app.post('/api/notes', noteController.createNote);
app.get('/api/notes/:id', noteController.getNoteById);
app.put('/api/notes/:id', noteController.updateNote);
app.delete('/api/notes/:id', noteController.deleteNote);

// Ruta para servir el archivo HTML de la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Ruta para servir el archivo HTML de la página de edición
app.get('/edit', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'edit.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
