import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LctabsComponent } from './lctabs/lctabs.component';
import { TaskComponent } from './practise/task.component';
import { CommentComponent } from './comment/comment.component';


const routes: Routes = [
{path:'lctabs',component:LctabsComponent},
{path:'task',component:TaskComponent},
{path:'cmt',component:CommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
