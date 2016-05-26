import {Comment1} from "../comment1/comment1";
import {Comment3} from "../comment3/comment3";
import {User} from "../user/user";

export interface Comment2 {
  id: number;
  text: string;
  postedby: User;
  //commentedon: Comment1;
  comments?: Comment3[];
}
