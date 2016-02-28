import {Group} from './group';
import {GROUPS} from './mock-groups';
import {Injectable} from 'angular2/core';
import {POSTS} from '../post/mock-posts';

@Injectable()
export class GroupService {
  
  getGroups() {
    return Promise.resolve(GROUPS);
  }
  
  // See the "Take it slow" appendix
  getGroupsSlowly() {
    return new Promise<Group[]>(resolve =>
      setTimeout(()=>resolve(GROUPS), 2000) // 2 seconds
    );
  }
  
  getGroup(groupname: string) {
    return Promise.resolve(GROUPS).then(
      groups => groups.filter(group => group.name === groupname)[0]
    );
  }
  
  getPostsInGroup(groupname: string) {
    return Promise.resolve(POSTS).then(
      posts => posts.filter(post => post.group.name === groupname)
    );
  }

}
