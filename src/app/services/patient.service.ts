import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  api = "http://localhost:8080/api/v1/patients";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Patient[]>(this.api);
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }

  create(patient: Patient){
    return this.http.post<Patient>(`${this.api}`, patient);
  }

  update(patient: Patient){
    return this.http.put(`${this.api}/${patient.id}`, patient);
  }

  /*completed(id: any, completed: any){
    return this.http.patch(`${this.api}/${id}`, {completed: !completed})
  }*/

}
