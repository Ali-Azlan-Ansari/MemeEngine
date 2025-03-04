import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TableModule, TagModule, RatingModule, ButtonModule, CommonModule],
  providers:[],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
  products!: any[];

  constructor() {}

  ngOnInit() {
    
          this.products = [{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" },{name:"Ali",category:"human" }];
      
  }


}
