import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TopNavComponent } from './top-nav/top-nav.component';
import { BottoBarComponent } from './botto-bar/botto-bar.component';
import { ProjectComponent } from './project/project.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,MenubarModule,TopNavComponent,BottoBarComponent,ProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'MemeEngine';

  items: MenuItem[] | undefined;

  ngOnInit() {
 
  }
}
