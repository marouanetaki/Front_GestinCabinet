import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Medecin } from '../../models/Medecin';
import { Specialite } from '../../models/Specialite';
import { ExportService } from '../../services/export.service';
import { MedecinService } from '../../services/medecin.service';
import { SpecialiteService } from '../../services/specialite.service';

@Component({
  selector: 'medecins',
  templateUrl: './medecins.component.html',
})
export class MedecinsComponent implements OnInit {

  /* the table reference */
  @ViewChild('medecinTable') medecinTable: ElementRef;
  medecin = new Medecin();
  liste : Medecin[];
  listeSp: Specialite[];

  constructor(private medecinService: MedecinService, private spService: SpecialiteService, private exportService: ExportService) { }

  ngOnInit(): void {
    this.getAll();
    this.getAllSpecialite();
  }

    //Export Function
    exportElmToExcel(): void {
      this.exportService.exportTableElmToExcel(this.medecinTable, 'medecin_data');
      Swal.fire(
        'Good job!',
        'Votre liste a été exporté',
        'success'
      );
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

  getAllSpecialite(){
    this.spService.findAll().subscribe((data) => this.listeSp = data)
  }

  getAll(){
    this.medecinService.findAll().subscribe(data => this.liste = data)
  }

  create(){
    this.medecinService.create(this.medecin).subscribe((md) => {
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Ajouté'
      })
      this.liste = [md, ...this.liste];
    }, (error) => this.Toast.fire({
      icon: 'error',
      title: error.toString()
    }));
    this.medecin = new Medecin();
  }

  edit(medecin: Medecin){
    this.medecin = medecin;
  }

  deleteMedecin(id: number){
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
        this.medecinService.delete(id).subscribe(() => {
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
    this.medecinService.update(this.medecin).subscribe(() => {
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Modifié'
      })
    }, (error) => this.Toast.fire({
      icon: 'error',
      title: error.body
    }));
    this.medecin = new Medecin();
  }
}
