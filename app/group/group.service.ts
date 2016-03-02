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
  
  getGroup(parent_group_name: string, groupname: string) {
    return Promise.resolve(MOCK_GROUPS).then(
      groups => groups.filter(group => group.name === groupname && group.parent_group.name === parent_group_name)[0]
    );
  }
  
  getPostsInGroup(parent_group_name: string, groupname: string) {
    return Promise.resolve(MOCK_POSTS).then(
      posts => posts.filter(post => post.group.name === groupname && post.group.parent_group.name === parent_group_name)
    );
  }

}