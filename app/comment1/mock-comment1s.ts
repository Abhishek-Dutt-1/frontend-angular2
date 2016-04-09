import {Comment1} from './comment1';
import {MOCK_USERS} from '../user/mock-users';
import {MOCK_COMMENT2S} from '../comment2/mock-comment2s';

export var MOCK_COMMENT1S: Comment1[] = [
  {
       id: 0,
       postedby: MOCK_USERS[0],
       text: "comment",
       comments: [MOCK_COMMENT2S[0]] 
     },
  {
    id: 1,
    postedby: MOCK_USERS[0],
    comments: [MOCK_COMMENT2S[1]],
    text: "Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23 Comment text 23"  
  },
  {
    id: 3,
    postedby: MOCK_USERS[2],
    text: "Comment text 15",
    comments: [MOCK_COMMENT2S[2]]        
  },
  {
    id: 4,
    text: "Reply Comment text 14",
    postedby: MOCK_USERS[0],
    comments: []
  },
  {
    id: 5,
    text: "Reply Comment text 13",
    postedby: MOCK_USERS[3],
    comments: [MOCK_COMMENT2S[4]]  
  },
  {
    "id": 6,
    postedby: MOCK_USERS[1],
    "text": "Comment text 20",
    "comments": []        
  },
  {
    "id": 7,
    postedby: MOCK_USERS[2],
    "text": "Comment text 21",
    "comments": []        
  },
  {
    "id": 8,
    postedby: MOCK_USERS[2],
    "text": "Comment text 22",
    "comments": []        
  },
  {
    "id": 9,
    postedby: MOCK_USERS[2],
    "text": "Comment text 23",
    "comments": []        
  }
]