import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private keycloackService: KeycloakService) { }

  getRoles(){
    return this.keycloackService.getUserRoles();
  }

  isAdmin(){
    let roles = this.keycloackService.getUserRoles().filter(rol => rol === 'administrador');
    if(roles.length > 0){
      return true;
    }else{
      return false;
    }
  }
}
