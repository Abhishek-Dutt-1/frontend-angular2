import {Group} from './group';
import {MOCK_GROUPS} from './mock-groups';
import {Injectable} from 'angular2/core';
import {MOCK_POSTS} from '../post/mock-posts';

@Injectable()
export class GroupService {
  
  getGroups() {
    return Promise.resolve(MOCK_GROUPS);
  }
  
  // See the "Take it slow" appendix
  getGroupsSlowly() {
    return new Promise<Group[]>(resolve =>
      setTimeout(()=>resolve(MOCK_GROUPS), 2000) // 2 seconds
    );
  }
  
  getGroup(groupname: string) {
    return Promise.resolve(MOCK_GROUPS).then(
      groups => groups.filter(group => group.name === groupname)[0]
    );
  }
  
  getPostsInGroup(groupname: string) {
    return Promise.resolve(MOCK_POSTS).then(
      posts => posts.filter(post => post.group.name === groupname)
    );
  }

}