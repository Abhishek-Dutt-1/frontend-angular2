import {Comment3} from "../comment3/comment3";
//import {Comment4} from "../comment4/comment4";
import {User} from "../user/user";

export interface Comment4 {
  id: number;
  text: string;
  postedby: User;
  commentedon: Comment3;
  //comments?: Comment4[];
}