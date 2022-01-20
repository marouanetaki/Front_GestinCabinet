import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { DossiersComponent } from './views/dossiers/dossiers.component';
import { MedecinsComponent } from './views/medecins/medecins.component';
import { PatientsComponent } from './views/patients/patients.component';
import { RdvsComponent } from './views/rdvs/rdvs.component';
import { SpecialitesComponent } from './views/specialites/specialites.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'charts',
        loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'patients',
        component: PatientsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'rdvs',
        component: RdvsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'specialites',
        component: SpecialitesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'medecins',
        component: MedecinsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dossiers',
        component: DossiersComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  //{ path: '**', component: "" }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
