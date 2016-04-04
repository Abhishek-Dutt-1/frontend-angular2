System.register(['./user-roles', '../group_of_groups/mock-group_of_groups'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_roles_1, mock_group_of_groups_1;
    var MOCK_USERS;
    return {
        setters:[
            function (user_roles_1_1) {
                user_roles_1 = user_roles_1_1;
            },
            function (mock_group_of_groups_1_1) {
                mock_group_of_groups_1 = mock_group_of_groups_1_1;
            }],
        execute: function() {
            exports_1("MOCK_USERS", MOCK_USERS = [
                {
                    id: 1,
                    email: 'iron@in.in',
                    displayname: 'Iron Man',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        international: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[4]],
                        national: mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[1],
                        state: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[5]],
                        city: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[2]],
                        local: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[3]]
                    }
                },
                {
                    id: 2,
                    email: 'captain@in.in',
                    displayname: 'Captain America',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        international: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[4]],
                        national: mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[1],
                        state: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[5]],
                        city: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[2]],
                        local: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[3]]
                    }
                },
                {
                    id: 3,
                    email: 'hulk@in.in',
                    displayname: 'Incredible Hulk',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        international: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[4]],
                        national: mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[1],
                        state: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[5]],
                        city: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[2]],
                        local: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[3]]
                    }
                },
                {
                    id: 4,
                    email: 'thor@in.in',
                    displayname: 'The Mighty Thor',
                    password: '123',
                    userrole: user_roles_1.UserRoles.user,
                    settings: {
                        international: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[4]],
                        national: mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[1],
                        state: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[5]],
                        city: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[2]],
                        local: [mock_group_of_groups_1.MOCK_GROUP_OF_GROUPS[3]]
                    }
                }
            ]);
        }
    }
});
//# sourceMappingURL=mock-users.js.map