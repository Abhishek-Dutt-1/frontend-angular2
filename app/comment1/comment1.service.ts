import {Comment1} from './comment1';
import {Post} from '../post/post';
import {MOCK_COMMENT1S} from './mock-comment1s';
import {MOCK_POSTS} from '../post/mock-posts';
import {Injectable} from 'angular2/core';
import {GroupService} from '../group/group.service';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable()
export class Comment1Service {
  
  constructor(
    //private _groupService: GroupService,
    private _authenticationService: AuthenticationService
  ) { }

  createNewComment1(newComment1: any, commentedOn: Post) {
    // Server should handle these things
    let lastComment1: Comment1 = MOCK_COMMENT1S.reduceRight((left, right) => {
                    if(left.id > right.id) return left
                      else return right;
                  });
    // Add Comment1
    let newProperComment1 = {
      id: +lastComment1.id + 1,
      text: newComment1.text,
      comments: [],
      postedby: newComment1.postedby,
    }
    MOCK_COMMENT1S.push(newProperComment1);
    
    // Add Comment1 to Post
    MOCK_POSTS.find(post => post.id == commentedOn.id).comments.push(newProperComment1);
    
    return Promise.resolve(newProperComment1);
  }
  
}