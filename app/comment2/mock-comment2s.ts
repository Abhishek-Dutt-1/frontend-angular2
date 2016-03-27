import {Comment2} from './comment2';
import {MOCK_USERS} from '../user/mock-users';
//import {MOCK_COMMENT2S} from '../comment2/mock-comment2s';

export var MOCK_COMMENT2S: Comment2[] = [
  {
    id: 0,
    postedby: MOCK_USERS[1],
    text: "This is a second level comment2 ",
    //comments: [MOCK_COMMENT2S[0]] 
  },
  {
    id: 1,
    postedby: MOCK_USERS[0],
    //comments: [MOCK_COMMENT2S[0]],
  text: "This is reply to a top level Comment1"  
  }
]