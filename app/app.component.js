System.register(['angular2/core', 'angular2/router', './hero/hero.service', './hero/heroes.component', './hero/hero-detail.component', './post/post.service', './post/post-list-loader.component', './post/post-detail.component', './post/view-post.component', './group/group.service', './group/view-group.component', './dashboard/dashboard.component'], function(exports_1, context_1) {
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
    var core_1, router_1, hero_service_1, heroes_component_1, hero_detail_component_1, post_service_1, post_list_loader_component_1, post_detail_component_1, view_post_component_1, group_service_1, view_group_component_1, dashboard_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            },
            function (heroes_component_1_1) {
                heroes_component_1 = heroes_component_1_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            },
            function (post_service_1_1) {
                post_service_1 = post_service_1_1;
            },
            function (post_list_loader_component_1_1) {
                post_list_loader_component_1 = post_list_loader_component_1_1;
            },
            function (post_detail_component_1_1) {
                post_detail_component_1 = post_detail_component_1_1;
            },
            function (view_post_component_1_1) {
                view_post_component_1 = view_post_component_1_1;
            },
            function (group_service_1_1) {
                group_service_1 = group_service_1_1;
            },
            function (view_group_component_1_1) {
                view_group_component_1 = view_group_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        /*
                        template: `
                          <!-- <h1>{{title}}</h1> -->
                          <nav>
                              <a [routerLink]="['Dashboard']">Dashboard</a>
                              <a [routerLink]="['Heroes']">Heroes</a>
                              <a [routerLink]="['Posts']">Posts</a>
                          </nav>
                          <router-outlet></router-outlet>
                        `,
                        */
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            hero_service_1.HeroService,
                            post_service_1.PostService,
                            group_service_1.GroupService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/heroes',
                            name: 'Heroes',
                            component: heroes_component_1.HeroesComponent
                        },
                        {
                            path: '/detail/:id',
                            name: 'HeroDetail',
                            component: hero_detail_component_1.HeroDetailComponent
                        },
                        {
                            path: '/posts',
                            name: 'PostList',
                            component: post_list_loader_component_1.PostListLoaderComponent
                        },
                        {
                            // would be changed to edit post
                            path: '/postdetail/:id',
                            name: 'PostDetail',
                            component: post_detail_component_1.PostDetailComponent
                        },
                        {
                            path: '/post/:id',
                            name: 'ViewPost',
                            component: view_post_component_1.ViewPostComponent
                        },
                        {
                            path: '/g/:groupname',
                            name: 'ViewGroup',
                            component: view_group_component_1.ViewGroupComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map