import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DossierMedical } from '../../models/DossierMedical';
import { Patient } from '../../models/Patient';
import { DossierService } from '../../services/dossier.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'dossiers',
  templateUrl: './dossiers.component.html',
})
export class DossiersComponent implements OnInit {

  dossier = new DossierMedical();
  liste : DossierMedical[];
  listePt : Patient[];
  showForm = false;
  showModal: boolean;

  constructor(private dossierService: DossierService, private patientService: PatientService) { }

  ngOnInit(): void {
    this.getAll();
    this.getPatient();
  }

  //Bootstrap Modal Open event
  show(){
    this.showModal = true; // Show-Hide Modal Check
  }

  //Bootstrap Modal Close event
  hide(){
    this.showModal = false;
  }

  getPatient(){
    this.patientService.findAll().subscribe((data) => this.listePt = data);
  }

  getAll(){
    this.dossierService.findAll().subscribe(data => this.liste = data)
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

  create(){
    this.dossierService.create(this.dossier).subscribe((ds) => {
      this.liste = [ds, ...this.liste];
      this.showForm = !this.showForm;
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Ajouté'
      })
    })
  }

  edit(ds: DossierMedical){
    this.dossier = ds;
    this.showForm = !this.showForm;
  }

  deleteDossier(id: number){
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
        this.dossierService.delete(id).subscribe(() => {
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
    this.dossierService.update(this.dossier).subscribe(() => {
      this.dossier = new DossierMedical();
      this.showForm = false;
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Ajouté'
      })
    })
  }

}
