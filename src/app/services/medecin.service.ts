import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Medecin } from '../models/Medecin';

@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  api = "https://gst-cabinet-springboot.herokuapp.com/api/v1/medecins";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Medecin[]>(this.api);
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }

  create(medecin: Medecin){
    return this.http.post<Medecin>(`${this.api}`, medecin);
  }

  update(medecin: Medecin){
    return this.http.put(`${this.api}/${medecin.id}`, medecin);
  }
}
