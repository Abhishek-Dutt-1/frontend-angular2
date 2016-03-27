import {Component, OnInit} from 'angular2/core';
//import {Post} from './post';
//import {PostService} from './post.service';
import {PostComponent} from './post.component';

@Component({
  selector: 'my-post-list',
  //template: `<div>{{posts1}} POST LIST</div>`,
  //template: `{{type1}} {{posts1}}<my-post [post]="posts1" [type]="type1">{{posts1}} POST LIST</my-post>`,
  templateUrl: 'app/post/post-list.component.html',
  styleUrls: ['app/post/post-list.component.css'],
  //directives: [PostDetailComponent],
  directives: [PostComponent],
  inputs: ["posts",  "postTemplateType"]

})
export class PostListComponent implements OnInit {

  //posts: Post[];
  //postTemplateType: string;
  
  constructor(
    //private _postService: PostService
    //private _router: Router
    ) { }
    
  ngOnInit() {
   
  }
 
}