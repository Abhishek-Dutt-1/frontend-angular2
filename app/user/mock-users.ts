import {User} from './user';
import {UserRoles} from './user-roles';
import {MOCK_SUPER_GROUPS} from '../super_group/mock-super_groups';

export var MOCK_USERS: User[] = [
  {
    id: 1,
    email: 'iron@in.in',
    emailverified: true,
    displayname: 'Iron Man',
    username: 'ironman',
    profileimage: '',
    password: '123',
    userrole: UserRoles.user,
    international: [MOCK_SUPER_GROUPS[1-1]],
    national: [MOCK_SUPER_GROUPS[3-1]],
    state: [MOCK_SUPER_GROUPS[5-1]],
    city: [MOCK_SUPER_GROUPS[7-1]],
    local: [MOCK_SUPER_GROUPS[9-1]],
    extra_emails: []
  },
  {
    id: 2,
    email: 'captain@in.in',
    emailverified: true,
    displayname: 'Captain America',
    username: 'cap',
    profileimage: '',
    password: '123',
    userrole: UserRoles.user,
    international: [MOCK_SUPER_GROUPS[4]],
    national: [MOCK_SUPER_GROUPS[1]],
    state: [MOCK_SUPER_GROUPS[5]],
    city: [MOCK_SUPER_GROUPS[2]],
    local: [MOCK_SUPER_GROUPS[3]],
    extra_emails: []
  },
  {
    id: 3,
    email: 'hulk@in.in',
    emailverified: true,
    displayname: 'Incredible Hulk',
    username: 'hulk',
    profileimage: '',
    password: '123',
    userrole: UserRoles.user,
    international: [MOCK_SUPER_GROUPS[4]],
    national: [MOCK_SUPER_GROUPS[1]],
    state: [MOCK_SUPER_GROUPS[5]],
    city: [MOCK_SUPER_GROUPS[2]],
    local: [MOCK_SUPER_GROUPS[3]],
    extra_emails: []
  },
  {
    id: 4,
    email: 'thor@in.in',
    emailverified: true,
    displayname: 'The Mighty Thor',
    username: 'thor',
    profileimage: '',
    password: '123',
    userrole: UserRoles.user,
    international: [MOCK_SUPER_GROUPS[4]],
    national: [MOCK_SUPER_GROUPS[1]],
    state: [MOCK_SUPER_GROUPS[5]],
    city: [MOCK_SUPER_GROUPS[2]],
    local: [MOCK_SUPER_GROUPS[3]],
    extra_emails: []
  }

]
