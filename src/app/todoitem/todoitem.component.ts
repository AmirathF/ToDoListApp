import {Attribute, Component, Input} from '@angular/core';
import { Task } from '../../model/task';

@Component({
  selector: 'app-todoitem',
  imports: [],
  templateUrl: './todoitem.component.html',
  styleUrl: './todoitem.component.scss'
})
export class TodoitemComponent {
  @Input()
  task!: Task;
}
