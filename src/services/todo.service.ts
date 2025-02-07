import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

   // Récupérer toutes les tâches
   getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Ajouter une tâche
  addTask(title: string): Observable<any> {
    return this.http.post(this.apiUrl, { title });
  }

  // Modifier une tâche
  updateTask(id: string, title: string, completed: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { title, completed });
  }

  // Supprimer une tâche
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
