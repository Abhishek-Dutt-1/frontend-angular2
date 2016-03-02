
import {Post} from './post';
import {MOCK_USERS} from '../user/mock-users';
import {MOCK_GROUPS} from '../group/mock-groups';
import {MOCK_COMMENT1S} from '../comment1/mock-comment1s';

export var MOCK_POSTS: Post[] = [
  {
    id: 0,
    upvotes: 1,
    downvotes: 1,
    title: 'title',
    text: 'textextext',
    type: 'text',
    postedby: MOCK_USERS[0],
    group: MOCK_GROUPS[1],
    comments: [MOCK_COMMENT1S[1], MOCK_COMMENT1S[0]]
  }
]  
  /*
  {
    id: 11, 
    upvotes: 10,
    downvotes: 4,
    postedby: MOCK_USERS[0],
    title: "I met Bryan Cranston one day while running in the morning and he was the nicest guy alive!!! OMG!!! :) ^_^", 
    text: "Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.", 
    type: "text",
    group: MOCK_GROUPS[0],
    comments: [
      MOCK_COMMENTS[6],
      MOCK_COMMENTS[3],
      MOCK_COMMENTS[7],
      MOCK_COMMENTS[8],
      MOCK_COMMENTS[9],
      MOCK_COMMENTS[11],
      MOCK_COMMENTS[12],
      MOCK_COMMENTS[13],
      MOCK_COMMENTS[14],
      MOCK_COMMENTS[15],
      MOCK_COMMENTS[16],
      MOCK_COMMENTS[17],
      MOCK_COMMENTS[18],
      MOCK_COMMENTS[19],
      MOCK_COMMENTS[20],
      MOCK_COMMENTS[21],
      MOCK_COMMENTS[22],
      MOCK_COMMENTS[23],
      MOCK_COMMENTS[24],
      MOCK_COMMENTS[25],
      MOCK_COMMENTS[26],
      MOCK_COMMENTS[27],
      MOCK_COMMENTS[28],
      MOCK_COMMENTS[29],
      MOCK_COMMENTS[30],
      MOCK_COMMENTS[31]
    ]
  },
  {
    id: 12, 
    upvotes: 0,
    downvotes: 0,
    postedby: MOCK_USERS[2],
    title: "Aaron Paul", 
    text: "Aaron Paul played the role of Jesse in Breaking Bad. He also featured in the \"Need For Speed\" Movie.", 
    type: "text",
    group: MOCK_GROUPS[2],
    comments: []
  },
  {
    id: 13, 
    upvotes: 0,
    downvotes: 0,
    postedby: MOCK_USERS[3],
    title: "Bob Odinkrik", 
    text: "Bob Odinkrik played the role of Saul in Breaking Bad. Due to public fondness for the character, Bob stars in his own show now, called \"Better Call Saul\".", 
    type: "text",
    group: MOCK_GROUPS[1],
    comments: []
  },
  {
    id: 14,
    upvotes: 0,
    downvotes: 0, 
    postedby: MOCK_USERS[1],
    title: "Title 14", 
    text: "Text 14", 
    type: "text",
    group: MOCK_GROUPS[0],
    comments: []
  },
  {
    "id": 15,
    upvotes: 0,
    downvotes: 0, 
    postedby: MOCK_USERS[3],
    "title": "Title 15", 
    "text": "Text 15", 
    type: "text",
    group: MOCK_GROUPS[4],
    comments: []
  },
  {
    "id": 16,
    upvotes: 0,
    downvotes: 0, 
    postedby: MOCK_USERS[2],
    "title": "Title 16", 
    "text": "Text 16", 
    type: "text",
    group: MOCK_GROUPS[5],
    comments: []
  },
  {
    "id": 17,
    upvotes: 0,
    downvotes: 0, 
    postedby: MOCK_USERS[0],
    "title": "Title 17", 
    "text": "Text 17", 
    type: "text",
    group: MOCK_GROUPS[3],
    comments: []
  },
  {
    "id": 18,
    upvotes: 0,
    downvotes: 0, 
    postedby: MOCK_USERS[2],
    "title": "Title 18", 
    "text": "Text 18", 
    type: "text",
    group: MOCK_GROUPS[4],
    comments: []
  },
  {
    "id": 19, 
    upvotes: 0,
    downvotes: 0,
    postedby: MOCK_USERS[1],
    "title": "Title 19", 
    "text": "Text 19", 
    type: "text",
    group: MOCK_GROUPS[1],
    comments: []
  },
  {
    id: 20,
    upvotes: 0,
    downvotes: 0, 
    postedby: MOCK_USERS[3],
    title: "TItle 20", 
    text: "Text 20", 
    type: "text",
    group: MOCK_GROUPS[0],
    comments: []
  }
];
*/