import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.page.html',
  styleUrls: ['./subject-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class SubjectDetailsPage implements OnInit {

  subjectId!: string;
  obligations: any[] = [];

  newType = 'Prvi kolokvijum';
  newDateTime = '';

  constructor(private route: ActivatedRoute, private subjectService: SubjectService) { }

  ngOnInit() {
    this.subjectId = this.route.snapshot.paramMap.get('id')!;
    this.loadObligations();
  }

  loadObligations() {
    this.subjectService.getObligations(this.subjectId).subscribe((data: any) => {
      this.obligations = data
        ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
        : [];
    });
  }

  addObligation() {
    const ob = {
      type: this.newType,
      dateTime: this.newDateTime || null
    };

    this.subjectService.addObligation(this.subjectId, ob).subscribe(() => {
      this.newDateTime = '';
      this.loadObligations();
    });
  }

  deleteObligation(obId: string) {
    this.subjectService.deleteObligation(this.subjectId, obId).subscribe(() => {
      this.loadObligations();
    });
  }

  editingId: string | null = null;
  editType = '';
  editDateTime = '';
  startEdit(ob: any) {
    this.editingId = ob.id;
    this.editType = ob.type;
    this.editDateTime = ob.dateTime || '';
  }

  cancelEdit() {
    this.editingId = null;
    this.editType = '';
    this.editDateTime = '';
  }

  saveEdit() {
    if (!this.editingId) return;

    const updated = {
      type: this.editType,
      dateTime: this.editDateTime || null
    };

    this.subjectService.updateObligation(this.subjectId, this.editingId, updated).subscribe(() => {
      this.cancelEdit();
      this.loadObligations();
    });
  }

}
