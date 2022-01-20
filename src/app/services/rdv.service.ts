import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rdv } from '../models/Rdv';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  api = "http://localhost:8080/api/v1/rdvs";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Rdv[]>(this.api);
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }

  create(rdv: Rdv){
    return this.http.post<Rdv>(`${this.api}`, rdv);
  }

  update(rdv: Rdv){
    return this.http.put(`${this.api}/${rdv.id}`, rdv);
  }
}
