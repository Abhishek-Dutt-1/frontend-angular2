System.register(['./user-roles'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_roles_1;
    var MOCK_USERS;
    return {
        setters:[
            function (user_roles_1_1) {
                user_roles_1 = user_roles_1_1;
            }],
        execute: function() {
            exports_1("MOCK_USERS", MOCK_USERS = [
                {
                    id: 0,
                    email: 'iron@in.in',
                    displayname: 'Iron Man',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        interntaional: ['usa', 'russia'],
                        national: ['india'],
                        state: ['karnataka'],
                        city: ['bangalore'],
                        sub_city: ['koramangala']
                    }
                },
                {
                    id: 1,
                    email: 'captain@in.in',
                    displayname: 'Captain America',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        interntaional: ['usa', 'russia'],
                        national: ['india'],
                        state: ['karnataka'],
                        city: ['bangalore'],
                        sub_city: ['koramangala']
                    }
                },
                {
                    id: 2,
                    email: 'hulk@in.in',
                    displayname: 'Incredible Hulk',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        interntaional: ['usa', 'russia'],
                        national: ['india'],
                        state: ['karnataka'],
                        city: ['bangalore'],
                        sub_city: ['koramangala']
                    }
                },
                {
                    id: 3,
                    email: 'thor@in.in',
                    displayname: 'The Mighty Thor',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        interntaional: ['usa', 'russia'],
                        national: ['india'],
                        state: ['karnataka'],
                        city: ['bangalore'],
                        sub_city: ['koramangala']
                    }
                }
            ]);
        }
    }
});
//# sourceMappingURL=mock-users.js.map