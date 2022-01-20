import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Specialite } from '../models/Specialite';

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  api = "http://localhost:8080/api/v1/specialites";

  constructor(private http: HttpClient) { }

  findAll(): Observable<Specialite[]>{
    return this.http.get<Specialite[]>(this.api);
  }

  findById(id: number): Observable<Specialite>{
    return this.http.get<Specialite>(`${this.api}/${id}`);
  }

  getStatistiques(): Observable<String[]>{
    return this.http.get<String[]>(`${this.api}/statistiques`);
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }

  create(specialite: Specialite){
    return this.http.post<Specialite>(`${this.api}`, specialite);
  }

  update(specialite: Specialite){
    return this.http.put(`${this.api}/${specialite.id}`, specialite);
  }
}
