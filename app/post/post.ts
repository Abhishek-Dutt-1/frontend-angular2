export interface Post {
  id: number;
  upvotes: number,
  downvotes: number,
  title: string;
  text: string;
  type: string;
  comments: any[]
}