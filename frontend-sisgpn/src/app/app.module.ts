import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PersonaComponent } from './components/persona/persona.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormregistrarpersonaComponent } from './components/persona/formregistrarpersona.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { FormvehiculoComponent } from './components/vehiculo/formvehiculo.component';
import { PaginatorvehiculoComponent } from './components/paginator/paginatorvehiculo.component';
import { DistritoComponent } from './components/distrito/distrito.component';
import { FormdistritoComponent } from './components/distrito/formdistrito.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8082/',
        realm: 'sisgpn',
        clientId: 'angular-sisgpn'
      },
      initOptions: {
        onLoad: 'login-required',
        flow: "standard",
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      loadUserProfileAtStartUp: true
    });
}


const routes: Routes = [
  //{ path: '', redirectTo: '/persona', pathMatch: 'full' },
  { path: 'listadopersonas', component: PersonaComponent },
  { path: 'listadopersonas/page/:page', component: PersonaComponent },
  { path: 'personas/form', component: FormregistrarpersonaComponent },
  { path: 'personas/form/:idPersona', component: FormregistrarpersonaComponent },

  { path: 'vehiculo', component: VehiculoComponent },
  { path: 'listadovehiculos', component: VehiculoComponent },
  { path: 'listadovehiculos/page/:page', component: VehiculoComponent },
  { path: 'vehiculos/form', component: FormvehiculoComponent },
  { path: 'vehiculos/form/:idVehiculo', component: FormvehiculoComponent },

  { path: 'distrito', component: DistritoComponent },
  { path: 'listadodistritos', component: DistritoComponent },
  { path: 'listadodistritos/page/:page', component: DistritoComponent },
  { path: 'distritos/form', component: FormdistritoComponent },
  { path: 'distritos/form/:idDistrito', component: FormdistritoComponent }

  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    PersonaComponent,
    VehiculoComponent,
    FormregistrarpersonaComponent,
    PaginatorComponent,
    FormvehiculoComponent,
    PaginatorvehiculoComponent,
    DistritoComponent,
    FormdistritoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
