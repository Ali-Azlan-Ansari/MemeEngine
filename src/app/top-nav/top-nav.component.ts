import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { MenuItemService } from '../menu-item.service';


@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent implements OnInit,AfterViewInit {
  constructor(private menuItemService:MenuItemService,private el: ElementRef, private renderer: Renderer2){}
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.menuItemService.menuItem$.subscribe((res)=>{
      this.items=res;
    })
    
  //   this.items = [
  //     {
  //         label: 'Project',
  //         icon: 'bx bx-folder-plus',
  //         iconClass:'icon-a',
  //         routerLink:'/'
  //     },
  //     {
  //         label: 'Create New Meme',
  //         icon: 'bx bx-laugh',
  //         iconClass:'icon-a',
  //         routerLink:'/create-meme'
  //     },
  //     {
  //         label: 'Archived',
  //         icon: 'bx bx-archive',
  //         iconClass:'icon-a'
  //     },
  //     {
  //         label: 'About',
  //         icon: 'bx bx-info-square',
  //         iconClass:'icon-a'
  //     }
  // ]
  }

  ngAfterViewInit() {
    // Get the navbar element
    const navbar = this.el.nativeElement.querySelector('.navbar');
    // Get its height
    const navbarHeight = navbar.offsetHeight;
    // Set the CSS variable dynamically
    this.renderer.setStyle(document.documentElement, '--navbar-height', `${navbarHeight}px`);
  }

}
