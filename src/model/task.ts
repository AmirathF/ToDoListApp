import {State} from '../enums/state';
import {Priority} from '../enums/priority';

export interface Task{
  title : string;
  description : string;
  date : Date;
  priority : Priority;
  state : State;
}
