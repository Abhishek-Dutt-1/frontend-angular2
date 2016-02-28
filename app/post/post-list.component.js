System.register(['angular2/core', './post.service', 'angular2/router', './post.component'], function(exports_1, context_1) {
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
    var core_1, post_service_1, router_1, post_component_1;
    var PostListComponent /*implements OnInit*/;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (post_component_1_1) {
                post_component_1 = post_component_1_1;
            }],
        execute: function() {
            PostListComponent /*implements OnInit*/ = (function () {
                //selectedPost: Post;
                function PostListComponent /*implements OnInit*/(_postService, _router) {
                    this._postService = _postService;
                    this._router = _router;
                }
                PostListComponent /*implements OnInit*/ = __decorate([
                    core_1.Component({
                        selector: 'my-post-list',
                        templateUrl: 'app/post/post-list.component.html',
                        styleUrls: ['app/post/post-list.component.css'],
                        //directives: [PostDetailComponent],
                        directives: [post_component_1.PostComponent],
                        inputs: ["posts", "type"]
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, router_1.Router])
                ], PostListComponent /*implements OnInit*/);
                return PostListComponent /*implements OnInit*/;
            }());
            exports_1("PostListComponent /*implements OnInit*/", PostListComponent /*implements OnInit*/);
        }
    }
});
//# sourceMappingURL=post-list.component.js.map