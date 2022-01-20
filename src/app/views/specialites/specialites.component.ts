import { Component, ElementRef, OnInit, ViewChild  } from '@angular/core';
import Swal from 'sweetalert2';
import { Specialite } from '../../models/Specialite';
import { ExportService } from '../../services/export.service';
import { SpecialiteService } from '../../services/specialite.service';

@Component({
  selector: 'specialites',
  templateUrl: './specialites.component.html',
})
export class SpecialitesComponent implements OnInit {

  /* the table reference */
  @ViewChild('specialiteTable') specialiteTable: ElementRef;
  specialite = new Specialite();
  liste : Specialite[];

  constructor(private exportService: ExportService,private spService: SpecialiteService) { }

  ngOnInit(): void {
    this.getAll();
  }

  //Export Function
  exportElmToExcel(): void {
    this.exportService.exportTableElmToExcel(this.specialiteTable, 'specialite_data');
    Swal.fire(
      'Good job!',
      'Votre liste a été exporté',
      'success'
    );
  }

  getAll(){
    this.spService.findAll().subscribe(data => this.liste = data)
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
    this.spService.create(this.specialite).subscribe((sp) => {
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Ajouté'
      })
      this.liste = [sp, ...this.liste];
    }, 
      error => console.log(error)
    )
    this.specialite = new Specialite();
  }

  edit(sp: Specialite){
    this.specialite = sp;
  }

  deleteSpecialite(id: number){
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
        this.spService.delete(id).subscribe(() => {
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
    this.spService.update(this.specialite).subscribe(() => {
      this.Toast.fire({
        icon: 'success',
        title: 'Enregistrement Modifié'
      })
    }, (error) => this.Toast.fire({
      icon: 'error',
      title: error
    }));
    this.specialite = new Specialite();
  }
}
