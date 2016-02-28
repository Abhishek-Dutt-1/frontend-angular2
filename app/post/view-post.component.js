System.register(['angular2/core', 'angular2/router', './post.service', './post.component', '../comment/comment.component'], function(exports_1, context_1) {
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
    var core_1, router_1, post_service_1, post_component_1, comment_component_1;
    var ViewPostComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (post_component_1_1) {
                post_component_1 = post_component_1_1;
            },
            function (comment_component_1_1) {
                comment_component_1 = comment_component_1_1;
            }],
        execute: function() {
            ViewPostComponent = (function () {
                function ViewPostComponent(_postService, _routeParams) {
                    this._postService = _postService;
                    this._routeParams = _routeParams;
                }
                ViewPostComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this._postService.getPost(id).then(function (post) { return _this.post = post; });
                    this.postTemplateType = 'main';
                };
                ViewPostComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-post',
                        templateUrl: 'app/post/view-post.component.html',
                        styleUrls: ['app/post/view-post.component.css'],
                        directives: [post_component_1.PostComponent, comment_component_1.CommentComponent]
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, router_1.RouteParams])
                ], ViewPostComponent);
                return ViewPostComponent;
            }());
            exports_1("ViewPostComponent", ViewPostComponent);
        }
    }
});
//# sourceMappingURL=view-post.component.js.map