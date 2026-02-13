import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';


import { SubjectService } from '../services/subject.service';
import { Subject } from '../models/subject';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {

  subjects: any[] = [];

  constructor(
    private subjectService: SubjectService,
    private alertCtrl: AlertController
  ) { }


  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getSubjects().subscribe((data: any) => {
      this.subjects = data
        ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
        : [];
    });
  }

  async addSubject() {
    const alert = await this.alertCtrl.create({
      header: 'Novi predmet',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'npr. Matematika 1'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            const name = (data.name || '').trim();
            if (!name) return false; // ne zatvara alert

            const newSub: Subject = { name };
            this.subjectService.addSubject(newSub).subscribe(() => {
              this.loadSubjects();
            });

            return true; // zatvara alert
          }
        }
      ]
    });

    await alert.present();
  }

  onDeleteClick(event: Event, id: string) {
    event.stopPropagation();      // spreči routerLink
    event.preventDefault();       // dodatno osiguranje
    this.deleteSubject(id);
  }

  deleteSubject(id: string) {
    this.subjectService.deleteSubject(id).subscribe(() => this.loadSubjects());
  }
}
