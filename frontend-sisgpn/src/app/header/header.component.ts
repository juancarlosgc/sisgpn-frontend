import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  isAdmin: any;
  
constructor(private keycloackService: KeycloakService,private util: UtilService) { }




ngOnInit() {
  this.isAdmin = this.util.isAdmin();
}

logout(){
  this.keycloackService.logout();
}

}
