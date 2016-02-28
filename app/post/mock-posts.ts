import {Post} from './post'
import {USERS} from '../user/mock-users'
import {GROUPS} from '../group/mock-groups'

export var POSTS: Post[] = [
    {"id": 11, 
    upvotes: 10,
    downvotes: 4,
    postedby: USERS[0],
    "title": "I met Bryan Cranston one day while running in the morning and he was the nicest guy alive!!! OMG!!! :) ^_^", 
    "text": "Bryan Cranston played the role of Walter in Breaking Bad. He is also known for playing Hal in Malcom in the Middle.", 
    "type": "text",
    group: GROUPS[0],
    "comments": [{
      "id": 12,
      postedby: USERS[1],
      "text": "Comment text 12",
      "comments": [{
        "id": 13,
        "text": "Reply Comment text 13",
        postedby: USERS[3],
        "comments": [{
          "id": 14,
          "text": "Reply Comment text 14",
          postedby: USERS[0]
        }]  
      }]
    },
    {
      "id": 15,
      postedby: USERS[2],
      "text": "Comment text 15",
      "comments": [{
        "id": 21,
        postedby: USERS[3],
        "text": "Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21",
        "comments": [{
          "id": 22,
          postedby: USERS[1],
          "text": "Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22",
          "comments": [{
            "id": 23,
            postedby: USERS[0],
            "text": "Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23"  
          }]  
        }]
      }]        
    },
    {
      "id": 16,
      postedby: USERS[2],
      "text": "Comment text 16",
      "comments": []        
    },
    {
      "id": 17,
      postedby: USERS[1],
      "text": "Comment text 17",
      "comments": []        
      },
    {
      "id": 18,
      postedby: USERS[2],
      "text": "Comment text 18",
      "comments": []        
    },
    {
      "id": 19,
      postedby: USERS[1],
      "text": "Comment text 19",
      "comments": [{
        "id": 21,
        postedby: USERS[0],
        "text": "Comment text 21",
        "comments": []
      }]
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[1],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[3],
      "text": "Comment text 20",
      "comments": []
    },
    {
      "id": 20,
      postedby: USERS[1],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[0],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[0],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[1],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    },
    {
      "id": 20,
      postedby: USERS[2],
      "text": "Comment text 20",
      "comments": []        
    }
    ]},
    {
      "id": 12, 
      upvotes: 0,
      downvotes: 0,
      postedby: USERS[2],
      "title": "Aaron Paul", 
      "text": " Aaron Paul played the role of Jesse in Breaking Bad. He also featured in the \"Need For Speed\" Movie.", 
      type: "text",
      group: GROUPS[2],
      comments: []
    },
    {
      "id": 13, 
      upvotes: 0,
      downvotes: 0,
      postedby: USERS[3],
      "title": "Bob Odinkrik", 
      "text": "Bob Odinkrik played the role of Saul in Breaking Bad. Due to public fondness for the character, Bob stars in his own show now, called \"Better Call Saul\".", 
      type: "text",
      group: GROUPS[1],
      comments: []
    },
    {
      "id": 14,
      upvotes: 0,
      downvotes: 0, 
      postedby: USERS[1],
      "title": "Title 14", 
      "text": "Text 14", 
      type: "text",
      group: GROUPS[0],
      comments: []
    },
    {
      "id": 15,
      upvotes: 0,
      downvotes: 0, 
      postedby: USERS[3],
      "title": "Title 15", 
      "text": "Text 15", 
      type: "text",
      group: GROUPS[4],
      comments: []
    },
    {
      "id": 16,
      upvotes: 0,
      downvotes: 0, 
      postedby: USERS[2],
      "title": "Title 16", 
      "text": "Text 16", 
      type: "text",
      group: GROUPS[5],
      comments: []
    },
    {
      "id": 17,
      upvotes: 0,
      downvotes: 0, 
      postedby: USERS[0],
      "title": "Title 17", 
      "text": "Text 17", 
      type: "text",
      group: GROUPS[3],
      comments: []
    },
    {
      "id": 18,
      upvotes: 0,
      downvotes: 0, 
      postedby: USERS[2],
      "title": "Title 18", 
      "text": "Text 18", 
      type: "text",
      group: GROUPS[4],
      comments: []
    },
    {
      "id": 19, 
      upvotes: 0,
      downvotes: 0,
      postedby: USERS[1],
      "title": "Title 19", 
      "text": "Text 19", 
      type: "text",
      group: GROUPS[1],
      comments: []
    },
    {
      "id": 20,
      upvotes: 0,
      downvotes: 0, 
      postedby: USERS[3],
      "title": "TItle 20", 
      "text": "Text 20", 
      type: "text",
      group: GROUPS[0],
      comments: []
    }
];
