System.register(['angular2/core', './post.component'], function(exports_1, context_1) {
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
    var core_1, post_component_1;
    var PostListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (post_component_1_1) {
                post_component_1 = post_component_1_1;
            }],
        execute: function() {
            PostListComponent = (function () {
                //posts: Post[];
                //postTemplateType: string;
                function PostListComponent() {
                }
                PostListComponent.prototype.ngOnInit = function () {
                };
                PostListComponent = __decorate([
                    core_1.Component({
                        selector: 'my-post-list',
                        //template: `<div>{{posts1}} POST LIST</div>`,
                        //template: `{{type1}} {{posts1}}<my-post [post]="posts1" [type]="type1">{{posts1}} POST LIST</my-post>`,
                        templateUrl: 'app/post/post-list.component.html',
                        styleUrls: ['app/post/post-list.component.css'],
                        //directives: [PostDetailComponent],
                        directives: [post_component_1.PostComponent],
                        inputs: ["posts", "postTemplateType"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PostListComponent);
                return PostListComponent;
            }());
            exports_1("PostListComponent", PostListComponent);
        }
    }
});
//# sourceMappingURL=post-list.component.js.map