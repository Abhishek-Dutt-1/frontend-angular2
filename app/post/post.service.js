System.register(['./mock-posts', 'angular2/core'], function(exports_1, context_1) {
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
    var mock_posts_1, core_1;
    var PostService;
    return {
        setters:[
            function (mock_posts_1_1) {
                mock_posts_1 = mock_posts_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            PostService = (function () {
                function PostService() {
                }
                PostService.prototype.getPosts = function () {
                    return Promise.resolve(mock_posts_1.MOCK_POSTS);
                };
                // See the "Take it slow" appendix
                PostService.prototype.getPostsSlowly = function () {
                    return new Promise(function (resolve) {
                        return setTimeout(function () { return resolve(mock_posts_1.MOCK_POSTS); }, 2000);
                    } // 2 seconds
                     // 2 seconds
                    );
                };
                PostService.prototype.getPost = function (id) {
                    return Promise.resolve(mock_posts_1.MOCK_POSTS).then(function (posts) { return posts.filter(function (post) { return post.id === id; })[0]; });
                };
                PostService.prototype.upVotePost = function (id) {
                    return true;
                };
                PostService.prototype.downVotePost = function (id) {
                    return true;
                };
                PostService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], PostService);
                return PostService;
            }());
            exports_1("PostService", PostService);
        }
    }
});
//# sourceMappingURL=post.service.js.map