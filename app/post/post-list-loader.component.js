System.register(['angular2/core', './post.service', './post-list.component'], function(exports_1, context_1) {
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
    var core_1, post_service_1, post_list_component_1;
    var PostListLoaderComponent /*implements OnInit*/;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (post_list_component_1_1) {
                post_list_component_1 = post_list_component_1_1;
            }],
        execute: function() {
            PostListLoaderComponent /*implements OnInit*/ = (function () {
                function PostListLoaderComponent /*implements OnInit*/(_postService) {
                    this._postService = _postService;
                }
                PostListLoaderComponent /*implements OnInit*/.prototype.getPosts = function () {
                    var _this = this;
                    this._postService.getPosts().then(function (posts) { return _this.posts = posts; });
                };
                PostListLoaderComponent /*implements OnInit*/.prototype.ngOnInit = function () {
                    this.getPosts();
                    this.postTemplateType = 'list';
                };
                PostListLoaderComponent /*implements OnInit*/ = __decorate([
                    core_1.Component({
                        selector: 'my-post-list-loader',
                        template: "<my-post-list [posts]=\"posts\" type=\"postTemplateType\"></my-post-list>",
                        //templateUrl: 'app/post/post-list.component.html',
                        styleUrls: ['app/post/post-list.component.css'],
                        //directives: [PostDetailComponent],
                        directives: [post_list_component_1.PostListComponent]
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService])
                ], PostListLoaderComponent /*implements OnInit*/);
                return PostListLoaderComponent /*implements OnInit*/;
            }());
            exports_1("PostListLoaderComponent /*implements OnInit*/", PostListLoaderComponent /*implements OnInit*/);
        }
    }
});
//# sourceMappingURL=post-list-loader.component.js.map