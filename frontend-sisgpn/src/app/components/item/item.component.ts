import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Item } from 'src/app/model/item';
import { Mantenimiento } from 'src/app/model/mantenimiento';
import { ItemService } from 'src/app/services/item.service';
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  isAdmin: any;
  items: Item[] = [];
  mantenimientos: Mantenimiento[] = [];
  paginadorItem: any;

  constructor(private itemService: ItemService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private util: UtilService) { }

  ngOnInit(): void {
    this.isAdmin = this.util.isAdmin();

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }

      this.itemService.getItems(page)
        .pipe(
          tap(response => {
            (response.content as Item[]).forEach(data => console.log(data.nombreItem));

          })
        ).subscribe(response => {
          this.items = response.content as Item[];
          this.paginadorItem = response;
        });
    }
    );
  }

  deleteItem(item: Item): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${item.codigoItem} ${item.nombreItem}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.itemService.deleteItem(item.idItem).subscribe(
          response => {
            this.items = this.items.filter(dis => dis !== item)
            swal(
              'Item Eliminado!',
              `Item ${item.nombreItem} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

  cargarMantenimientos(): void {
    this.itemService.listMantenimientos().subscribe(data => this.mantenimientos = data);
  }


}
