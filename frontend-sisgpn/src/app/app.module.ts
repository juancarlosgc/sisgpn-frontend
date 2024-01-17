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
import { PaginatordistritoComponent } from './components/paginator/paginatordistrito.component';
import { CircuitoComponent } from './components/circuito/circuito.component';
import { FormcircuitoComponent } from './components/circuito/formcircuito.component';
import { PaginatorcircuitoComponent } from './components/paginator/paginatorcircuito.component';
import { SubcircuitoComponent } from './components/subcircuito/subcircuito.component';
import { FormsubcircuitoComponent } from './components/subcircuito/formsubcircuito.component';
import { PaginatorsubcircuitoComponent } from './components/paginator/paginatorsubcircuito.component';
import { DistritopersonaComponent } from './components/asignaciones/distritopersona/distritopersona.component';
import { VehiculopersonaComponent } from './components/asignaciones/vehiculopersona/vehiculopersona.component';
import { FormdistritopersonaComponent } from './components/asignaciones/distritopersona/formdistritopersona.component';
import { MantenimientoComponent } from './components/mantenimiento/mantenimiento.component';
import { FormmantenimientoComponent } from './components/mantenimiento/formmantenimiento.component';
import { PaginatormantenimientoComponent } from './components/paginator/paginatormantenimiento.component';
import { ItemComponent } from './components/item/item.component';
import { FormitemComponent } from './components/item/formitem.component';
import { DistritovehiculoComponent } from './components/asignaciones/distritovehiculo/distritovehiculo.component';
import { FormdistritovehiculoComponent } from './components/asignaciones/distritovehiculo/formdistritovehiculo.component';
import { FormvehiculopersonaComponent } from './components/asignaciones/vehiculopersona/formvehiculopersona.component';
import { ReclamosComponent } from './components/reclamos/reclamos.component';
import { FormreclamosComponent } from './components/reclamos/formreclamos.component';



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
  { path: 'distritos/form/:idDistrito', component: FormdistritoComponent },

  { path: 'circuito', component: CircuitoComponent },
  { path: 'listadocircuitos', component: CircuitoComponent },
  { path: 'listadocircuitos/page/:page', component: CircuitoComponent },
  { path: 'circuitos/form', component: FormcircuitoComponent },
  { path: 'circuitos/form/:idCircuito', component: FormcircuitoComponent },

  { path: 'subcircuito', component: SubcircuitoComponent },
  { path: 'listadosubcircuitos', component: SubcircuitoComponent },
  { path: 'listadosubcircuitos/page/:page', component: SubcircuitoComponent },
  { path: 'subcircuitos/form', component: FormsubcircuitoComponent },
  { path: 'subcircuitos/form/:idSubcircuito', component: FormsubcircuitoComponent },

  { path: 'distritopersona', component: DistritopersonaComponent },
  { path: 'listadodistritopersona', component: DistritopersonaComponent },
  { path: 'listadodistritopersona/page/:page', component: DistritopersonaComponent },
  { path: 'distritopersona/form', component: FormdistritopersonaComponent },
  { path: 'distritopersona/form/:idDistritoPersona', component: FormdistritopersonaComponent },

  { path: 'mantenimiento', component: MantenimientoComponent },
  { path: 'listadomantenimiento', component: MantenimientoComponent },
  { path: 'listadomantenimiento/page/:page', component: MantenimientoComponent },
  { path: 'mantenimiento/form', component: FormmantenimientoComponent },
  { path: 'mantenimiento/form/:idMantenimiento', component: FormmantenimientoComponent },

  { path: 'item', component: ItemComponent },
  { path: 'listadoitem', component: ItemComponent },
  { path: 'listadoitem/page/:page', component: ItemComponent },
  { path: 'item/form', component: FormitemComponent },
  { path: 'item/form/:idItem', component: FormitemComponent },

  { path: 'distritovehiculo', component: DistritovehiculoComponent },
  { path: 'listadodistritovehiculo', component: DistritovehiculoComponent },
  { path: 'listadodistritovehiculo/page/:page', component: DistritovehiculoComponent },
  { path: 'distritovehiculo/form', component: FormdistritovehiculoComponent },
  { path: 'distritovehiculo/form/:idDistritoVehiculo', component: FormdistritovehiculoComponent },

  { path: 'vehiculopersona', component: VehiculopersonaComponent },
  { path: 'listadovehiculopersona', component: VehiculopersonaComponent },
  { path: 'listadovehiculopersona/page/:page', component: VehiculopersonaComponent },
  { path: 'vehiculopersona/form', component: FormvehiculopersonaComponent },
  { path: 'vehiculopersona/form/:idVehiculoPersona', component: FormvehiculopersonaComponent },
  
  { path: 'reclamo', component: ReclamosComponent },
  { path: 'listadoreclamo', component: ReclamosComponent },
  { path: 'listadovehiculopersona/page/:page', component: FormreclamosComponent },
  { path: 'reclamo/form', component: FormreclamosComponent },
  { path: 'vehiculopersona/form/:idVehiculoPersona', component: FormreclamosComponent }  


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
    FormdistritoComponent,
    PaginatordistritoComponent,
    CircuitoComponent,
    FormcircuitoComponent,
    PaginatorcircuitoComponent,
    SubcircuitoComponent,
    PaginatorsubcircuitoComponent,
    FormsubcircuitoComponent,
    DistritopersonaComponent,
    VehiculopersonaComponent,
    FormdistritopersonaComponent,
    MantenimientoComponent,
    FormmantenimientoComponent,
    PaginatormantenimientoComponent,
    ItemComponent,
    FormitemComponent,
    DistritovehiculoComponent,
    FormdistritovehiculoComponent,
    FormvehiculopersonaComponent,
    ReclamosComponent,
    FormreclamosComponent

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
