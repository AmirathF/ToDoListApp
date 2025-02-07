const express = require('express'); // Framework web pour créer l'API
const cors = require('cors'); // Permet à Angular d'accéder à l'API
const mongoose = require('mongoose'); // Outil pour se connecter à MongoDB
require('dotenv').config(); // Permet d'utiliser des variables d’environnement

const app = express(); // Initialise notre serveur Express
const PORT = process.env.PORT || 5000; //Utilise le port défini dans .env (process.env.PORT) si disponible Sinon, utilise le port 5000 par défaut.

app.use(cors()); // Active CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Permet à Express de lire les données JSON

const Task = require('./models/Tasks'); // Importe le modèle Tasks

// Route GET : Récupérer toutes les tâches
app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Task.find(); // Récupère toutes les tâches dans MongoDB
      res.json(tasks); // Renvoie les tâches sous forme JSON
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Route POST : Ajouter une nouvelle tâche
  app.post('/tasks', async (req, res) => {
    try {
        const { title } = req.body; // Récupère le titre de la tâche envoyée par Angular
        if (!title) return res.status(400).json({ error: "Le titre est requis." });
    
        const newTask = new Task({ title }); // Crée une nouvelle tâche
        await newTask.save(); // Sauvegarde dans MongoDB
        res.status(201).json(newTask); // Renvoie la tâche ajoutée
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  });
  
  // Route PUT : Modifier une tâche (changement de titre ou statut complété)
app.put('/tasks/:id', async (req, res) => {
    try {
      const { title, completed } = req.body; // Récupère les nouvelles valeurs
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id, // ID de la tâche à modifier
        { title, completed }, // Nouvelles valeurs
        { new: true } // Retourne la nouvelle version modifiée
      );
  
      if (!updatedTask) return res.status(404).json({ error: "Tâche non trouvée." });
      res.json(updatedTask); // Renvoie la tâche mise à jour
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Route DELETE : Supprimer une tâche
  app.delete('/tasks/:id', async (req, res) => {
    try {
      const deletedTask = await Task.findByIdAndDelete(req.params.id); // Supprime la tâche via son ID
      if (!deletedTask) return res.status(404).json({ error: "Tâche non trouvée." });
  
      res.json({ message: "Tâche supprimée avec succès !" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


  //Connexion à MongoDB
  mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  .then(() => console.log(" MongoDB connecté"))
  .catch(err => console.error(" Erreur MongoDB", err));


  // Route de test
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API Node.js ");
  });

  
  // Lancer le serveur
  app.listen(PORT, () => {
    console.log(` Serveur en ligne sur http://localhost:${PORT}`);
  });