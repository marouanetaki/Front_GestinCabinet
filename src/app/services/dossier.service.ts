import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DossierMedical } from '../models/DossierMedical';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  api = "https://gst-cabinet-springboot.herokuapp.com/api/v1/dossiers";

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<DossierMedical[]>(this.api);
  }

  delete(id: number){
    return this.http.delete(`${this.api}/${id}`);
  }

  create(dossier: DossierMedical){
    return this.http.post<DossierMedical>(`${this.api}`, dossier);
  }

  update(dossier: DossierMedical){
    return this.http.put(`${this.api}/${dossier.id}`, dossier);
  }
}
