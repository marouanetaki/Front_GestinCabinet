import { DOCUMENT } from '@angular/common';
import {Component, Inject} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService){}

  logout(){
    this.auth.logout();
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
