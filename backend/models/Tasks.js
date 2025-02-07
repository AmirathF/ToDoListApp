const mongoose = require('mongoose'); // Import de Mongoose

// Définition du schéma Task (une tâche a un titre et un statut complété ou non)
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titre obligatoire
  completed: { type: Boolean, default: false } // Par défaut, la tâche n'est pas complétée
});

// Export du modèle pour l'utiliser dans `server.js`
module.exports = mongoose.model('Task', TaskSchema);