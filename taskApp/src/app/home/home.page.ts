import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage implements OnInit {

  tasks: any[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  addTask() {
    const newTask = {
      title: 'Novi task',
      description: 'Dodat iz aplikacije',
      done: false
    };

    this.taskService.addTask(newTask).subscribe(() => {
      this.loadTasks(); // refresh liste
    });
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }


  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      if (!data) {
        this.tasks = [];
        return;
      }

      this.tasks = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));
    });
  }
}
