System.register(['angular2/core', 'angular2/router', './group.service'], function(exports_1, context_1) {
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
    var core_1, router_1, group_service_1;
    var ViewGroupComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            }],
        execute: function() {
            ViewGroupComponent = (function () {
                function ViewGroupComponent(_groupService, _routeParams) {
                    this._groupService = _groupService;
                    this._routeParams = _routeParams;
                }
                ViewGroupComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var groupname = this._routeParams.get('groupname');
                    this._groupService.getGroup(groupname)
                        .then(function (group) { return _this.group = group; });
                    this._groupService.getPostsInGroup(groupname)
                        .then(function (posts) { return _this.groupPosts = posts; });
                };
                ViewGroupComponent.prototype.goBack = function () {
                    window.history.back();
                };
                ViewGroupComponent = __decorate([
                    core_1.Component({
                        selector: 'my-view-group',
                        templateUrl: 'app/group/view-group.component.html',
                        styleUrls: ['app/group/view-group.component.css'],
                        inputs: ['group']
                    }), 
                    __metadata('design:paramtypes', [group_service_1.GroupService, router_1.RouteParams])
                ], ViewGroupComponent);
                return ViewGroupComponent;
            }());
            exports_1("ViewGroupComponent", ViewGroupComponent);
        }
    }
});
//# sourceMappingURL=view-group.component.js.map