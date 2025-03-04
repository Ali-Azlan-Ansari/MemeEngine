import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  constructor() { }

 


  private menuItem = new BehaviorSubject<any>( [
    {
        label: 'Project',
        icon: 'bx bx-folder-plus',
        iconClass:'icon-a',
        routerLink:'/'
    },
    {
        label: 'Create New Meme',
        icon: 'bx bx-laugh',
        iconClass:'icon-a',
        routerLink:'/create-meme'
    },
    {
        label: 'Archived',
        icon: 'bx bx-archive',
        iconClass:'icon-a'
    },
    {
        label: 'About',
        icon: 'bx bx-info-square',
        iconClass:'icon-a'
    }
]
);
  menuItem$ = this.menuItem.asObservable();

  // Method to increment counter
  changeItem(items:any) {
    this.menuItem.next(items);
  }
}
