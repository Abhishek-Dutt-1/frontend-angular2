import {User} from "../user/user"

export interface Comment2 {
  id: number;
  text: string;
  postedby: User;
//  comments: Comment3[];
}