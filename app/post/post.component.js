System.register(['angular2/core', 'angular2/router', './post.service'], function(exports_1, context_1) {
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
    var core_1, router_1, post_service_1;
    var PostComponent;
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
            }],
        execute: function() {
            PostComponent = (function () {
                function PostComponent(_postService, _router) {
                    this._postService = _postService;
                    this._router = _router;
                }
                PostComponent.prototype.gotoPost = function (id) {
                    this._router.navigate(['ViewPost', { id: id }]);
                };
                PostComponent.prototype.gotoGroup = function (name) {
                    this._router.navigate(['ViewGroup', { groupname: name }]);
                };
                PostComponent.prototype.goBack = function () {
                    window.history.back();
                };
                PostComponent.prototype.upVotePost = function (id) {
                    this.post.upvotes++;
                    this._postService.upVotePost(id);
                };
                PostComponent.prototype.downVotePost = function (id) {
                    this.post.downvotes++;
                    this._postService.downVotePost(id);
                };
                PostComponent = __decorate([
                    core_1.Component({
                        selector: 'my-post',
                        template: "\n    <li *ngIf=\"type === 'list'\" class=\"post mdl-list__item mdl-list__item--three-line\">\n      <span class=\"post mdl-list__item-primary-content\">\n        <!-- <i class=\"material-icons mdl-list__item-avatar\">person</i> -->\n        <span (click)=\"gotoPost(post.id)\" class=\"post-title\">{{post.title}}</span>\n        <span class=\"mdl-list__item-text-body\">\n          {{post.text}}  \n        </span>\n        <span class=\"mdl-list__item-text-body\">\n          <div class=\"toolbox\">\n            <div>\n              <i class=\"material-icons mdl-list__item-icon\">person</i>\n              {{post.postedby.username}} | 12 days ago | <span (click)=\"gotoGroup(post.group.name)\">go/{{post.group.name}}</span>\n            </div>\n            <div>\n              {{post.upvotes}} Upvote | {{post.downvotes}} Downvote | {{post.comments.length}} Comments\n            </div>\n          </div>\n         </span>\n      </span>\n      <!--\n      <span class=\"mdl-list__item-secondary-content\">\n        <a class=\"mdl-list__item-secondary-action\" href=\"#\"><i class=\"material-icons\">star</i></a>\n      </span>\n      -->\n    </li>\n    \n    \n    <li *ngIf=\"type === 'grouplist'\" class=\"post mdl-list__item mdl-list__item--three-line\">\n      <span class=\"post mdl-list__item-primary-content\">\n        <!-- <i class=\"material-icons mdl-list__item-avatar\">person</i> -->\n        <span (click)=\"gotoPost(post.id)\" class=\"post-title\">{{post.title}}</span>\n        <span class=\"mdl-list__item-text-body\">\n          {{post.text}}  \n        </span>\n        <span class=\"mdl-list__item-text-body\">\n          <div class=\"toolbox\">\n            <div>\n              <i class=\"material-icons mdl-list__item-icon\">person</i>\n              {{post.postedby.username}} | 12 days ago\n            </div>\n            <div>\n              {{post.upvotes}} Upvote | {{post.downvotes}} Downvote | {{post.comments.length}} Comments\n            </div>\n          </div>\n         </span>\n      </span>\n      <!--\n      <span class=\"mdl-list__item-secondary-content\">\n        <a class=\"mdl-list__item-secondary-action\" href=\"#\"><i class=\"material-icons\">star</i></a>\n      </span>\n      -->\n    </li>\n    \n    \n    <div *ngIf=\"type === 'main'\">\n      <div class=\"post-main demo-card-wide mdl-card mdl-shadow--2dp\">\n        <div class=\"mdl-card__title\">\n          <h2 class=\"mdl-card__title-text\">{{post.title}}</h2>\n        </div>\n        <div class=\"mdl-card__supporting-text\">\n          {{post.text}}\n        </div>\n        <div class=\"mdl-card__actions mdl-card--border\">\n          <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">\n          <i class=\"material-icons mdl-list__item-icon\">person</i> {{post.postedby.username}} \n          </a>\n          <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">\n          Edit \n          </a>\n          <a (click)=\"upVotePost(post.id)\" class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">\n          {{post.upvotes}} Vote up\n          </a>\n          <a (click)=\"downVotePost(post.id)\" class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">\n          {{post.downvotes}} Vote down\n          </a>\n          <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">\n          go/{{post.group.name}} \n          </a>\n          <a (click)=\"goBack()\" class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\">\n          back \n          </a>\n        </div>\n        <div class=\"mdl-card__menu\">\n          <button class=\"mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect\">\n          <i class=\"material-icons\">share</i>\n          </button>\n        </div>\n      </div>\n    </div>\n  ",
                        styleUrls: ['app/post/post.component.css'],
                        inputs: ['post', 'type']
                    }), 
                    __metadata('design:paramtypes', [post_service_1.PostService, router_1.Router])
                ], PostComponent);
                return PostComponent;
            }());
            exports_1("PostComponent", PostComponent);
        }
    }
});
//# sourceMappingURL=post.component.js.map