import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

constructor(public matdialog:MatDialog){

  
}

// opendialog(): void{

//   this.matdialog.open({
//     width: '200px',
//   });
// }

}

