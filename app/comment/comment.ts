import {User} from "../user/user"
export interface Comment {
  id: number;
  text: string;
  postedby: User;
}