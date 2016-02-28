System.register(['./mock-groups', 'angular2/core', '../post/mock-posts'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var mock_groups_1, core_1, mock_posts_1;
    var GroupService;
    return {
        setters:[
            function (mock_groups_1_1) {
                mock_groups_1 = mock_groups_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_posts_1_1) {
                mock_posts_1 = mock_posts_1_1;
            }],
        execute: function() {
            GroupService = (function () {
                function GroupService() {
                }
                GroupService.prototype.getGroups = function () {
                    return Promise.resolve(mock_groups_1.GROUPS);
                };
                // See the "Take it slow" appendix
                GroupService.prototype.getGroupsSlowly = function () {
                    return new Promise(function (resolve) {
                        return setTimeout(function () { return resolve(mock_groups_1.GROUPS); }, 2000);
                    } // 2 seconds
                     // 2 seconds
                    );
                };
                GroupService.prototype.getGroup = function (groupname) {
                    return Promise.resolve(mock_groups_1.GROUPS).then(function (groups) { return groups.filter(function (group) { return group.name === groupname; })[0]; });
                };
                GroupService.prototype.getPostsInGroup = function (groupname) {
                    return Promise.resolve(mock_posts_1.POSTS).then(function (posts) { return posts.filter(function (post) { return post.group.name === groupname; }); });
                };
                GroupService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], GroupService);
                return GroupService;
            }());
            exports_1("GroupService", GroupService);
        }
    }
});
//# sourceMappingURL=group.service.js.map