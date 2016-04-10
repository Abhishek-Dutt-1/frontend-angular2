import {User} from '../user/user'
import {Comment1} from '../comment1/comment1'
import {Group} from '../group/group'

export interface Post {
  id: number;
  upvotes: number,
  downvotes: number,
  title: string;
  text: string;
  link?: string;
  type: string;
  comments: Comment1[];
  postedby: User;
  group: Group;
}