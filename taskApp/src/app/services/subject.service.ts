import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl = environment.firebase.databaseURL + '/subjects';

  constructor(private http: HttpClient) {}

  // READ
  getSubjects() {
    return this.http.get(`${this.baseUrl}.json`);
  }

  // CREATE
  addSubject(subject: Subject) {
    return this.http.post(`${this.baseUrl}.json`, subject);
  }

  // DELETE
  deleteSubject(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}.json`);
  }

  // UPDATE
  updateSubject(id: string, subject: Subject) {
    return this.http.put(`${this.baseUrl}/${id}.json`, subject);
  }

  // READ obligations for a subject
getObligations(subjectId: string) {
  return this.http.get(`${this.baseUrl}/${subjectId}/obligations.json`);
}

// CREATE obligation
addObligation(subjectId: string, obligation: any) {
  return this.http.post(`${this.baseUrl}/${subjectId}/obligations.json`, obligation);
}

// DELETE obligation
deleteObligation(subjectId: string, obligationId: string) {
  return this.http.delete(`${this.baseUrl}/${subjectId}/obligations/${obligationId}.json`);
}

updateObligation(subjectId: string, obligationId: string, obligation: any) {
  return this.http.put(`${this.baseUrl}/${subjectId}/obligations/${obligationId}.json`, obligation);
}

}