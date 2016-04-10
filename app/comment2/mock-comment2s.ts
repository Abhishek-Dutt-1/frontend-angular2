import {Comment2} from './comment2';
import {MOCK_USERS} from '../user/mock-users';
//import {MOCK_COMMENT2S} from '../comment2/mock-comment2s';

export var MOCK_COMMENT2S: Comment2[] = [
  {
    id: 0,
    postedby: MOCK_USERS[1],
    text: "(1) This is a second level comment2 ",
    //comments: [MOCK_COMMENT2S[0]] 
  },
  {
    id: 1,
    postedby: MOCK_USERS[0],
    //comments: [MOCK_COMMENT2S[0]],
  text: "(2) This is reply to a top level Comment1"  
  },
  {
    id: 2,
    postedby: MOCK_USERS[0],
    //comments: [MOCK_COMMENT2S[0]],
  text: "(3) This is reply to a top level Comment1"  
  },
  {
    id: 3,
    postedby: MOCK_USERS[0],
    //comments: [MOCK_COMMENT2S[0]],
  text: "(4) This is reply to a top level Comment1"  
  },
  {
    id: 4,
    postedby: MOCK_USERS[0],
    //comments: [MOCK_COMMENT2S[0]],
  text: "(4) This is reply to a top level Comment1"  
  }
]