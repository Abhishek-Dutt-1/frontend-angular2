System.register(['../user/mock-users'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mock_users_1;
    var MOCK_COMMENT1S;
    return {
        setters:[
            function (mock_users_1_1) {
                mock_users_1 = mock_users_1_1;
            }],
        execute: function() {
            //import {MOCK_COMMENT2S} from '../comment2/mock-comment2s';
            exports_1("MOCK_COMMENT1S", MOCK_COMMENT1S = [
                {
                    id: 0,
                    postedby: mock_users_1.MOCK_USERS[0],
                    text: "comment",
                },
                {
                    id: 1,
                    postedby: mock_users_1.MOCK_USERS[0],
                    //comments: [MOCK_COMMENT2S[0]],
                    text: "Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23 Reply Comment text 23"
                }]); /*,
            {
              id: 1,
              postedby: MOCK_USERS[1],
              text: "Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22 Reply Comment text 22",
              comments: [MOCK_COMMENTS[0]]
            },
            {
              id: 2,
              postedby: MOCK_USERS[3],
              text: "Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21 Comment text 21",
              comments: [MOCK_COMMENTS[1]]
            },
            {
              id: 3,
              postedby: MOCK_USERS[2],
              text: "Comment text 15",
              comments: [MOCK_COMMENTS[2]]
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
              comments: [MOCK_COMMENTS[4]]
            },
            {
              id: 6,
              postedby: MOCK_USERS[1],
              text: "Comment text 12",
              comments: [MOCK_COMMENTS[5]]
            },
            {
              id: 7,
              postedby: MOCK_USERS[2],
              text: "Comment text 16",
              comments: []
            },
            {
              "id": 8,
              postedby: MOCK_USERS[1],
              "text": "Comment text 17",
              "comments": []
            },
            {
              "id": 9,
              postedby: MOCK_USERS[2],
              "text": "Comment text 18",
              "comments": []
            },
            {
              "id": 10,
              postedby: MOCK_USERS[0],
              "text": "Comment text 21",
              "comments": []
            },
            {
              "id": 11,
              postedby: MOCK_USERS[1],
              "text": "Comment text 19",
              "comments": [MOCK_COMMENTS[10]]
            },
            {
              "id": 12,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 13,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 14,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 15,
              postedby: MOCK_USERS[1],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 16,
              postedby: MOCK_USERS[3],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 17,
              postedby: MOCK_USERS[1],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 18,
              postedby: MOCK_USERS[0],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 19,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 20,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 21,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 22,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 23,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
            "id": 24,
            postedby: MOCK_USERS[2],
            "text": "Comment text 20",
            "comments": []
            },
            {
              "id": 25,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 26,
              postedby: MOCK_USERS[0],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 27,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 28,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 29,
              postedby: MOCK_USERS[1],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 30,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            },
            {
              "id": 31,
              postedby: MOCK_USERS[2],
              "text": "Comment text 20",
              "comments": []
            }
          ] */
        }
    }
});
//# sourceMappingURL=mock-comment1s.js.map