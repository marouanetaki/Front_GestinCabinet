import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Patient } from '../../models/Patient';
import { ExportService } from '../../services/export.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'patients',
  templateUrl: './patients.component.html',
})
export class PatientsComponent implements OnInit {

  /* the table reference */
  @ViewChild('patientTable') patientTable: ElementRef;
  patient = new Patient();
  listePatient: Patient[];

  constructor(private patientService: PatientService, private exportService:ExportService ) { }

  ngOnInit(): void {
    this.getAll();
  }

    //Export Function
    exportElmToExcel(): void {
      this.exportService.exportTableElmToExcel(this.patientTable, 'patient_data');
      Swal.fire(
        'Good job!',
        'Votre liste a été exporté',
        'success'
      )
    }

  getAll(){
    this.patientService.findAll().subscribe(data => this.listePatient = data)
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
    this.patientService.create(this.patient).subscribe((pt) => {
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Ajouté'
      })
      this.listePatient = [...this.listePatient, pt];
    }, (error) => this.Toast.fire({
      icon: 'error',
      title: error.toString()
    }));
    this.patient = new Patient();
  }

  edit(patient: Patient){
    this.patient = patient;
  }

  deletePatient(id: number){
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
        this.patientService.delete(id).subscribe(() => {
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
    this.patientService.update(this.patient).subscribe(() => {
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Modifié'
      })
    this.patient = new Patient();
    }, (error) => this.Toast.fire({
      icon: 'error',
      title: error.toString()
    }));
  }

}
