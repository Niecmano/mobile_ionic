import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = environment.firebase.databaseURL + '/tasks';

  constructor(private http: HttpClient) {}

  // READ
  getTasks() {
    return this.http.get(`${this.baseUrl}.json`);
  }

  // CREATE
  addTask(task: Task) {
    return this.http.post(`${this.baseUrl}.json`, task);
  }

  // DELETE
  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}.json`);
  }

  // UPDATE
  updateTask(id: string, task: Task) {
    return this.http.put(`${this.baseUrl}/${id}.json`, task);
  }
}
