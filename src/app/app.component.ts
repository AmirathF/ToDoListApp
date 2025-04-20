import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ajout du FormsModule
import { TodoComponent } from './todo/todo.component';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule, TodoComponent, NavbarComponent],
})
export class AppComponent {
  //title = 'My To-Do List';

   // Liste des tâches
  //  tasks: string[] = [];

  // newTask: string = ''; // Nouvelle variable pour stocker la saisie
  // errorMessage: string = ''; // 🔥 Déclaration de la variable d'erreur

  // constructor() {
  //   this.loadTasks(); // Charger les tâches sauvegardées au démarrage
  // }

  // // Méthode pour ajouter une tâche
  // addTask() {
  //   if (this.newTask.trim()==='') { // Vérifie que l'entrée n'est pas vide
  //     this.errorMessage = "Veuillez entrer une tâche !"; // 🔴 Afficher un message d'erreur
  //     return;
  //   }
  //   this.tasks.push(this.newTask);
  //   this.saveTasks(); // Sauvegarde dans localStorage
  //   this.newTask = ''; // Réinitialise le champ après ajout
  //   this.errorMessage = '';
  // }

  // // Méthode pour supprimer une tâche
  // deleteTask(index: number) {
  //   this.tasks.splice(index, 1);
  // }

  //  // Sauvegarde des tâches dans localStorage
  //  saveTasks() {
  //   localStorage.setItem('tasks', JSON.stringify(this.tasks));
  // }

  //  // Chargement des tâches au démarrage
  //  loadTasks() {
  //   const savedTasks = localStorage.getItem('tasks');
  //   if (savedTasks) {
  //     this.tasks = JSON.parse(savedTasks);
  //   }
  // }
}
