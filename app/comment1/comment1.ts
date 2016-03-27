import {User} from '../user/user';
import {Comment2} from '../comment2/comment2';

export interface Comment1 {
  id: number;
  text: string;
  postedby: User;
  comments: Comment2[];
}