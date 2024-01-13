import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/model/item';
import { Mantenimiento } from 'src/app/model/mantenimiento';
import { ItemService } from 'src/app/services/item.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formitem',
  templateUrl: './formitem.component.html',
  styleUrls: ['./formitem.component.css']
})
export class FormitemComponent implements OnInit{

  mantenimiento: Mantenimiento[] = [];

  public items: Item = new Item();
  public mantenimientos: Mantenimiento = new Mantenimiento();

  constructor(private itemService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.cargarItem();
    this.cargarMantenimientos();
  }

  createItem(): void {
    this.itemService.createItem(this.items)
      .subscribe(data => {
        this.router.navigate(['/listadoitem'])
        swal('Nuevo Item', `Item  ${this.items.nombreItem} creado con éxito!`, 'success')
      }
      )
  }

  cargarItem(): void {
    this.activatedRoute.params.subscribe(params => {
      let idItem = params['idItem']
      if (idItem) {
        this.itemService.getItem(idItem).subscribe((data) => this.items = data)
      }
    }
    )
  }

  updateItem(): void {
    this.itemService.updateItem(this.items)
      .subscribe(data => {
        this.router.navigate(['/listadoitem'])
        swal('Item Actualizado', `Item ${this.items.nombreItem} actualizado con éxito!`, 'success')
      }
      )
  }

  cargarMantenimientos(): void {
    this.itemService.listMantenimientos().subscribe(data => this.mantenimiento = data);
  }

}
