import {Post} from './post';
import {MOCK_POSTS} from './mock-posts';
import {Injectable} from 'angular2/core';
import {GroupService} from '../group/group.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class PostService {
  
  constructor(
    private _groupService: GroupService,
    private _authenticationService: AuthenticationService
  ) { }
  
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

  /**
   * Returns posts belonging to a geoSelection
   */
  getPostsByGeoSelection(geoSelection: string) {
    let user = this._authenticationService.getLoggedInUser();
    if(user) {
      if(geoSelection == 'international') {
        return Promise.resolve({
          posts: MOCK_POSTS.filter(post => user.settings.international.map(int => int.id).indexOf(post.group.super_group.id) > -1 ),
          superGroupList: user.settings.international
        })  
      }
      if(geoSelection == 'national') {
        return Promise.resolve({
          posts: MOCK_POSTS.filter(post => user.settings.national.id == post.group.super_group.id),
          superGroupList: [user.settings.national]
        })  
      }
      if(geoSelection == 'state') {
        return Promise.resolve({
          posts: MOCK_POSTS.filter(post => user.settings.state.map(el => el.id).indexOf(post.group.super_group.id) > -1 ),
          superGroupList: user.settings.state
        })  
      }
      if(geoSelection == 'city') {
        return Promise.resolve({
          posts: MOCK_POSTS.filter(post => user.settings.city.map(el => el.id).indexOf(post.group.super_group.id) > -1 ),
          superGroupList: user.settings.city
        })  
      }
      if(geoSelection == 'local') {
        return Promise.resolve({
          posts: MOCK_POSTS.filter(post => user.settings.local.map(el => el.id).indexOf(post.group.super_group.id) > -1 ),
          superGroupList: user.settings.local
        })  
      } 
    }
  }
  
  createNewPost(newPost: any) {
    // Server should handle these things
    let lastPost:Post = MOCK_POSTS.reduceRight((left, right) => {
                    if(left.id > right.id) return left
                      else return right;
                  });

    let newPost_superGroup = newPost.superGroupSlashGroup.split('/')[0]
    let newPost_group = newPost.superGroupSlashGroup.split('/')[1]
    
    //return this._groupService.getGroup(newPost.group_of_groups, newPost.group).then(
    return this._groupService.getGroup(newPost_superGroup, newPost_group).then(
      group => {
        let newProperPost = {
          id: +lastPost.id + 1,
          upvotes: 0,
          downvotes: 0,
          title: newPost.title,
          text: newPost.text,
          type: newPost.type,
          comments: [],
          postedby: newPost.postedby,
          group: group
        }
        MOCK_POSTS.push(newProperPost);
        return newProperPost;
      }
    )
  }
  
  upVotePost(id: number) {
    return true
  }
  
  downVotePost(id: number) {
    return true
  }
  
}