import {Comment2} from "../comment2/comment2";
import {Comment4} from "../comment4/comment4";
import {User} from "../user/user";

export interface Comment3 {
  id: number;
  text: string;
  postedby: User;
  commentedon: Comment2;
  comments?: Comment4[];
}