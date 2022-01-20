import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule } from '@angular/common/http';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { SpecialitesComponent } from './views/specialites/specialites.component';
import { PatientsComponent } from './views/patients/patients.component';
import { RdvsComponent } from './views/rdvs/rdvs.component';
import { MedecinsComponent } from './views/medecins/medecins.component';
import { DossiersComponent } from './views/dossiers/dossiers.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    FormsModule,
    HttpClientModule,
    IconSetModule.forRoot(),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-nsq5ui7c.us.auth0.com',
      clientId: '28bOwFJaI7srMeu6S2cw9EaWic3uxTVK'
    }),
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    SpecialitesComponent,
    PatientsComponent,
    RdvsComponent,
    MedecinsComponent,
    DossiersComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    IconSetService,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
