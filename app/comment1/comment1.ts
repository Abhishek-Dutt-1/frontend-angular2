import {User} from "../user/user"

export interface Comment1 {
  id: number;
  text: string;
  postedby: User;
//  comments: Comment2[];
}