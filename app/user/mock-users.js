"use strict";
var user_roles_1 = require('./user-roles');
var mock_super_groups_1 = require('../super_group/mock-super_groups');
exports.MOCK_USERS = [
    {
        id: 1,
        email: 'iron@in.in',
        displayname: 'Iron Man',
        password: '123',
        userrole: user_roles_1.UserRoles.user,
        international: [mock_super_groups_1.MOCK_SUPER_GROUPS[1 - 1]],
        national: [mock_super_groups_1.MOCK_SUPER_GROUPS[3 - 1]],
        state: [mock_super_groups_1.MOCK_SUPER_GROUPS[5 - 1]],
        city: [mock_super_groups_1.MOCK_SUPER_GROUPS[7 - 1]],
        local: [mock_super_groups_1.MOCK_SUPER_GROUPS[9 - 1]]
    },
    {
        id: 2,
        email: 'captain@in.in',
        displayname: 'Captain America',
        password: '123',
        userrole: user_roles_1.UserRoles.user,
        international: [mock_super_groups_1.MOCK_SUPER_GROUPS[4]],
        national: [mock_super_groups_1.MOCK_SUPER_GROUPS[1]],
        state: [mock_super_groups_1.MOCK_SUPER_GROUPS[5]],
        city: [mock_super_groups_1.MOCK_SUPER_GROUPS[2]],
        local: [mock_super_groups_1.MOCK_SUPER_GROUPS[3]]
    },
    {
        id: 3,
        email: 'hulk@in.in',
        displayname: 'Incredible Hulk',
        password: '123',
        userrole: user_roles_1.UserRoles.user,
        international: [mock_super_groups_1.MOCK_SUPER_GROUPS[4]],
        national: [mock_super_groups_1.MOCK_SUPER_GROUPS[1]],
        state: [mock_super_groups_1.MOCK_SUPER_GROUPS[5]],
        city: [mock_super_groups_1.MOCK_SUPER_GROUPS[2]],
        local: [mock_super_groups_1.MOCK_SUPER_GROUPS[3]]
    },
    {
        id: 4,
        email: 'thor@in.in',
        displayname: 'The Mighty Thor',
        password: '123',
        userrole: user_roles_1.UserRoles.user,
        international: [mock_super_groups_1.MOCK_SUPER_GROUPS[4]],
        national: [mock_super_groups_1.MOCK_SUPER_GROUPS[1]],
        state: [mock_super_groups_1.MOCK_SUPER_GROUPS[5]],
        city: [mock_super_groups_1.MOCK_SUPER_GROUPS[2]],
        local: [mock_super_groups_1.MOCK_SUPER_GROUPS[3]]
    }
];
//# sourceMappingURL=mock-users.js.map