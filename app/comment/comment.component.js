System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var CommentComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            //import {Router} from 'angular2/router';
            //import {PostService} from './post.service';
            CommentComponent = (function () {
                function CommentComponent() {
                }
                CommentComponent = __decorate([
                    core_1.Component({
                        selector: 'my-comment',
                        template: "\n    <div class=\"comment\">\n      <i class=\"material-icons mdl-list__item-icon\">person</i> {{comment.postedby.username}}\n      <div class=\"\">\n        {{comment.text}}\n      </div>\n    </div>\n  ",
                        styleUrls: ['app/comment/comment.component.css'],
                        inputs: ['comment', 'type']
                    }), 
                    __metadata('design:paramtypes', [])
                ], CommentComponent);
                return CommentComponent;
            }());
            exports_1("CommentComponent", CommentComponent);
        }
    }
});
//# sourceMappingURL=comment.component.js.map