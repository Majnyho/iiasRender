// public/js/script.js

// Función para cargar todas las notas al cargar la página
window.onload = () => {
    getNotes();
  };
  
  // Función para obtener todas las notas
  async function getNotes() {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        throw new Error('No se pudieron obtener las notas');
      }
      const notes = await response.json();
      displayNotes(notes);
    } catch (error) {
      console.error(error);
    }
  }
  
  // Función para mostrar todas las notas en la página
  function displayNotes(notes) {
    const notesContainer = document.getElementById('notes-container');
    notesContainer.innerHTML = '';
    notes.forEach(note => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <button onclick="editNote('${note._id}')">Editar</button>
        <button onclick="deleteNote('${note._id}')">Eliminar</button>
      `;
      notesContainer.appendChild(noteElement);
    });
  }
  
  // Función para crear una nueva nota
  async function createNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
      });
      if (!response.ok) {
        throw new Error('No se pudo crear la nota');
      }
      const newNote = await response.json();
      getNotes();
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
    } catch (error) {
      console.error(error);
    }
  }
  
  // Función para editar una nota
  async function editNote(id) {
    window.location.href = `/edit?id=${id}`;
  }
  
  // Función para eliminar una nota
  async function deleteNote(id) {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('No se pudo eliminar la nota');
      }
      getNotes();
    } catch (error) {
      console.error(error);
    }
  }
  