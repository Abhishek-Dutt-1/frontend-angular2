import {Group} from './group';
import {MOCK_GROUPS} from './mock-groups';
import {Injectable} from 'angular2/core';
import {MOCK_POSTS} from '../post/mock-posts';
import {Http, Jsonp, Response, URLSearchParams} from 'angular2/http';


@Injectable()
export class GroupService {
  
  constructor(private http: Http, private jsonp: Jsonp) {
  }
  
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
      groups => groups.filter(group => group.name === groupname && group.super_group.name === parent_group_name)[0]
    );
  }
  
  getPostsInGroup(parent_group_name: string, groupname: string) {
    return Promise.resolve(MOCK_POSTS).then(
      posts => posts.filter(post => post.group.name === groupname && post.group.super_group.name === parent_group_name)
    );
  }

  /**
   * Fetch a list of super_group/group names for autocomplete dropdown in new post form
   * TODO:: SETUP BACKEND TO TEST THIS
   * TODO:: CHANGE JSONP TO HTTP
   */
  searchGroups(searchTermArray: string[]) {
    
    // Temp use a local promise version
    return Promise.resolve(MOCK_GROUPS).then(
      groups => groups.filter(
        //group => (group.name.indexOf(searchTerm) > -1) || (group.parent_group.name.indexOf(searchTerm) > -1)
        group => {
          // 1 element => no '/' was used, search on both parent and group name
          if(searchTermArray.length == 1) {
            return (group.name.indexOf(searchTermArray[0]) > -1) || (group.super_group.name.indexOf(searchTermArray[0]) > -1)
          }
          // 2 elements => a '/' was used, search first element on parent and 2nd element on group name
          if(searchTermArray.length == 2) {
            return (group.name.indexOf(searchTermArray[1]) > -1) && (group.super_group.name.indexOf(searchTermArray[0]) > -1)
          }
          
        }
      )
    )
    
    /*
    // Finally should use this observable version
    let searchUrl = 'http://en.wikipedia.org/w/api.php'
    
    var params = new URLSearchParams();
    params.set('search', searchTerm);       // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');
    return this.jsonp
              .get(searchUrl, { search: params })
              .map(request => <string[]> request.json()[1]);
    */
  }
  
  /**
   * Returns a list of groups based on its type
   */
  getGroupsBySuperGroupType(groupType: string) {
    return Promise.resolve(MOCK_GROUPS).then(
      groups => groups.filter(group => group.super_group.type === groupType)
    );
  }
  
}