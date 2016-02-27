System.register(['angular2/core', './post-detail.component', './post.service', 'angular2/router'], function(exports_1, context_1) {
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
    var core_1, post_detail_component_1, post_service_1, router_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (post_detail_component_1_1) {
                post_detail_component_1 = post_detail_component_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postService, _router) {
                    this._postService = _postService;
                    this._router = _router;
                    this.title = 'Tour of Posts';
                }
                PostsComponent.prototype.getPosts = function () {
                    var _this = this;
                    this._postService.getPosts().then(function (posts) { return _this.posts = posts; });
                };
                PostsComponent.prototype.ngOnInit = function () {
                    this.getPosts();
                };
                PostsComponent.prototype.onSelect = function (post) { this.selectedPost = post; };
                PostsComponent.prototype.gotoDetail = function () {
                    this._router.navigate(['PostDetail', { id: this.selectedPost.id }]);
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        selector: 'my-posts',
                        templateUrl: 'app/post/posts.component.html',
                        styleUrls: ['app/post/posts.component.css'],
                        directives: [post_detail_component_1.PostDetailComponent],
                        providers: []
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, router_1.Router])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map