
import {Post} from './post';
import {MOCK_USERS} from '../user/mock-users';
import {MOCK_GROUPS} from '../group/mock-groups';
import {MOCK_COMMENT1S} from '../comment1/mock-comment1s';

export var MOCK_POSTS: Post[] = [
  {
    id: 1,
    upvotes: 1,
    downvotes: 1,
    title: 'AngularJs CRUD Operations | Angular 2 JavaScript KnockoutJs AngularJs Kendo UI HTML 5 Web API',
    text: 'AngularJs CRUD Operations | Angular 2 JavaScript KnockoutJs AngularJs Kendo UI HTML 5 Web API',
    type: 'text',
    postedby: MOCK_USERS[0],
    group: MOCK_GROUPS[1],
    comments: [MOCK_COMMENT1S[1], MOCK_COMMENT1S[0]],
    currentUserHasUpVoted: false,
    currentUserHasDownVoted: false
  },
  {
    id: 2,
    upvotes: 1,
    downvotes: 1,
    title: 'I am using angular beta version, having issue for webpack, gulp and bower.',
    text: 'I am using angular beta version, having issue for webpack, gulp and bower.',
    type: 'text',
    postedby: MOCK_USERS[1],
    group: MOCK_GROUPS[0],
    comments: [MOCK_COMMENT1S[3], MOCK_COMMENT1S[4]],
    currentUserHasUpVoted: false,
    currentUserHasDownVoted: false
  },
  {
    id: 3,
    upvotes: 1,
    downvotes: 1,
    title: 'Learn how to build an exciting application from the top to bottom with AngularJs and Angular 2',
    text: 'Learn how to build an exciting application from the top to bottom with AngularJs and Angular 2',
    type: 'text',
    postedby: MOCK_USERS[1],
    group: MOCK_GROUPS[0],
    comments: [MOCK_COMMENT1S[5], MOCK_COMMENT1S[6]],
    currentUserHasUpVoted: false,
    currentUserHasDownVoted: false
  },
  {
    id: 4,
    upvotes: 1,
    downvotes: 1,
    title: 'Rihanna - Kiss It Better (Explicit)',
    text: 'Cool song',
    link: 'https://www.youtube.com/watch?v=49lY0HqqUVc#start=0:00;end=4:08;cycles=-1;autoreplay=true',
    type: 'link',
    postedby: MOCK_USERS[3],
    group: MOCK_GROUPS[3],
    comments: [MOCK_COMMENT1S[5], MOCK_COMMENT1S[6]],
    currentUserHasUpVoted: false,
    currentUserHasDownVoted: false
  },
  {
    id: 5,
    upvotes: 1,
    downvotes: 1,
    title: 'How to Squat: The complete guide.',
    text: '',
    link: 'http://strengtheory.com/how-to-squat/',
    type: 'link',
    postedby: MOCK_USERS[2],
    group: MOCK_GROUPS[3],
    comments: [MOCK_COMMENT1S[5], MOCK_COMMENT1S[6]],
    currentUserHasUpVoted: false,
    currentUserHasDownVoted: false
  }
];
