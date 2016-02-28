import {User} from '../user/user'
import {Comment} from '../comment/comment'

export interface Post {
  id: number;
  upvotes: number,
  downvotes: number,
  title: string;
  text: string;
  type: string;
  comments: Comment[];
  postedby: User;
}