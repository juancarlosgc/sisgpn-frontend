import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements  OnInit {
  list=[
    {
      number:  1,
      name:"Inicio",
      icon: 'fa-solid fa-house',
    },

    {
      number:  2,
      name:"Personal",
      icon: 'fa-solid fa-people-group',
    }
    

  ];

  constructor() { }
  ngOnInit(): void {
  }

}
