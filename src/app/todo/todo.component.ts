import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {TodoitemComponent} from '../todoitem/todoitem.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss', '../app.component.scss'],
  imports: [FormsModule, CommonModule, TodoitemComponent]
})
export class TodoComponent implements OnInit {

  tasks: any[] = [];
  newTask: string = '';
  editMode: boolean = false;
  editedTaskId: string | null = null;
  editingIndex: number | null = null;
  errorMessage: string = '';


  constructor(private todoService: TodoService) {}
    ngOnInit() {
    this.getTasks();
  }
  getTasks() {
    this.todoService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des tâches :", err); }
    });
  }

  // 🔹 Ajouter une tâche
  addTask() {
    if (this.newTask.trim() === '') {
      this.errorMessage = "La tâche ne peut pas être vide !";
      return;
    }

    // ✅ Si on est en mode édition, on met à jour la tâche au lieu d'en ajouter une nouvelle
    if (this.editMode && this.editedTaskId) {
      this.saveTask();
      return;
    }

    this.todoService.addTask(this.newTask).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTask = '';
        this.errorMessage = '';
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout :", err);
      }
    });
  }
  // 🔹 Supprimer une tâche
  deleteTask(id: string) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task._id !== id);

    });
  }

  // 🔹 Activer le mode édition pour une tâche
  editTask(task: any) {
    this.editMode = true;
    this.editedTaskId = task._id;
    this.newTask = task.title;
  }

  // 🔹 Sauvegarder les modifications
  saveTask() {
    if (!this.editedTaskId || this.newTask.trim() === '') {
      this.errorMessage = "Le titre ne peut pas être vide !";
      return;
    }

    const updatedTask = { title: this.newTask, completed: false };

    this.todoService.updateTask(this.editedTaskId, this.newTask, false).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(task => task._id === this.editedTaskId);
      if (index !== -1) {
        this.tasks[index] = updatedTask;

      }
      //this.tasks[this.editingIndex!] = updatedTask;
      this.editMode = false;
      this.editedTaskId = null;
      this.newTask = '';
      this.errorMessage = ''; // ✅ Effacer l'erreur après succès
    },
      error: (err) => {
        console.error("Erreur lors de la mise à jour :", err);
      }
    });
  }
}
