import {Post} from './post';
import {MOCK_POSTS} from './mock-posts';
import {Injectable} from 'angular2/core';

@Injectable()
export class PostService {
  
  getPosts() {
    return Promise.resolve(MOCK_POSTS);
  }
  
  // See the "Take it slow" appendix
  getPostsSlowly() {
    return new Promise<Post[]>(resolve =>
      setTimeout(()=>resolve(MOCK_POSTS), 2000) // 2 seconds
    );
  }
  
  getPost(id: number) {
    return Promise.resolve(MOCK_POSTS).then(
      posts => posts.filter(post => post.id === id)[0]
    );
  }
  
  getPostsByGroupOfGroups(gog_names: string[]) {
    return Promise.resolve(MOCK_POSTS).then(
      //posts => posts.filter(post => post.group.parent_group.name === gog_names)
      posts => posts.filter(post => gog_names.indexOf(post.group.parent_group.name) > -1)
      //posts => posts.filter(post => gog_names.filter(gog => gog.name === post.group.parent_group.name)
    );
  }
  
  upVotePost(id: number) {
    return true
  }
  
  downVotePost(id: number) {
    return true
  }
}