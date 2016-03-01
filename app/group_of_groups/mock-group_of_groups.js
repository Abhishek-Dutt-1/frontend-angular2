System.register(['../group/mock-groups'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mock_groups_1;
    var MOCK_GROUP_OF_GROUPS;
    return {
        setters:[
            function (mock_groups_1_1) {
                mock_groups_1 = mock_groups_1_1;
            }],
        execute: function() {
            // Grouop's name and urls are same
            exports_1("MOCK_GROUP_OF_GROUPS", MOCK_GROUP_OF_GROUPS = [
                {
                    id: 0,
                    name: 'gog0',
                    sub_groups: [mock_groups_1.MOCK_GROUPS[0], mock_groups_1.MOCK_GROUPS[1]]
                },
                {
                    id: 1,
                    name: 'gog1',
                    sub_groups: [mock_groups_1.MOCK_GROUPS[2], mock_groups_1.MOCK_GROUPS[3]]
                },
                {
                    id: 2,
                    name: 'gog2',
                    sub_groups: [mock_groups_1.MOCK_GROUPS[4]]
                },
                {
                    id: 3,
                    name: 'gog3',
                    sub_groups: [mock_groups_1.MOCK_GROUPS[5], mock_groups_1.MOCK_GROUPS[1]]
                },
                {
                    id: 4,
                    name: 'gog4',
                    sub_groups: [mock_groups_1.MOCK_GROUPS[2], mock_groups_1.MOCK_GROUPS[4]]
                },
                {
                    id: 5,
                    name: 'gog5',
                    sub_groups: [mock_groups_1.MOCK_GROUPS[0], mock_groups_1.MOCK_GROUPS[1]]
                }
            ]);
        }
    }
});
//# sourceMappingURL=mock-group_of_groups.js.map