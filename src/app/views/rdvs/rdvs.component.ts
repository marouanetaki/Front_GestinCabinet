import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Medecin } from '../../models/Medecin';
import { Patient } from '../../models/Patient';
import { Rdv } from '../../models/Rdv';
import { MedecinService } from '../../services/medecin.service';
import { PatientService } from '../../services/patient.service';
import { RdvService } from '../../services/rdv.service';

@Component({
  selector: 'rdvs',
  templateUrl: './rdvs.component.html',
})
export class RdvsComponent implements OnInit {

  rdv = new Rdv();
  liste : Rdv[];
  listePt : Patient[];
  listeMd : Medecin[];
  showForm = false;
  showModal: boolean;

  constructor(private rdvService: RdvService, private patientService: PatientService, private medcinService : MedecinService) { }

  ngOnInit(): void {
    this.getAll();
    this.getMedecin();
    this.getPatient();
  }  

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  //Bootstrap Modal Open event
  show(id: number){
    this.showModal = true; // Show-Hide Modal Check
    
  }

  //Bootstrap Modal Close event
  hide(){
    this.showModal = false;
  }

  getPatient(){
    this.patientService.findAll().subscribe((data) => this.listePt = data);
  }

  getMedecin(){
    this.medcinService.findAll().subscribe((data) => this.listeMd = data);
  }

  getAll(){
    this.rdvService.findAll().subscribe(data => this.liste = data)
  }

  create(){
    this.rdvService.create(this.rdv).subscribe((rd) => {
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Ajouté'
      })
      this.liste = [rd, ...this.liste];
      this.showForm = false;
    }, (error) => this.Toast.fire({
      icon: 'error',
      title: error
    }));
  }

  edit(rdv: Rdv){
    this.rdv = rdv;
    this.showForm = !this.showForm;
  }

  deleterdv(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rdvService.delete(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.getAll();
        })
      }
    })
  }

  update(){
    this.rdvService.update(this.rdv).subscribe(() => {
      this.rdv = new Rdv();
      this.showForm = false;
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Modifié'
      })
    }, (error) => this.Toast.fire({
      icon: 'error',
      title: error
    }));
  }

}
