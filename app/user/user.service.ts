import {User} from './user';
import {MOCK_USERS} from './mock-users';
import {Injectable} from 'angular2/core';
import {GroupService} from '../group/group.service';
import {UserRoles} from './user-roles';

@Injectable()
export class UserService {
  
  constructor(
    private _groupService: GroupService
  ) { }
  
  getUsers() {
    return Promise.resolve(MOCK_USERS);
  }
  
  getUser(id: number) {
    return Promise.resolve(MOCK_USERS).then(
      users => users.filter(user => user.id === id)[0]
    );
  }
  
  createNewUser(newUser: any) {
    // Serve should handle these things
    let lastUser:User = MOCK_USERS.reduceRight((left, right) => {
                    if(left.id > right.id) return left
                      else return right;
                  });

    let newProperUser = {
      id: +lastUser.id + 1,
      email: newUser.email,
      displayname: newUser.displayname,
      password: newUser.password,
      userrole: UserRoles.user,
      confirm_password: newUser.confirm_password,
      international: newUser.international,
      national: newUser.national,
      state: newUser.state,
      city: newUser.city,
      sub_city: newUser.sub_city 
    }
    MOCK_USERS.push(newProperUser);
    
    return this.getUser(newProperUser.id);
  }
  
}