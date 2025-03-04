import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { CreateMemeComponent } from './create-meme/create-meme.component';

export const routes: Routes = [{path:'', component:ProjectComponent},{  path:'create-meme',component:CreateMemeComponent}];
