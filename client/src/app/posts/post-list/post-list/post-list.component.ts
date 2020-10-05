import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { PostService } from '../../post-service/post.service';
import { Post } from '../../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  pageLoaded: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.fetchPosts();
  }

  //Function to fetch posts from backend
  fetchPosts(){
    var transformedPosts = [];
    this.postService.fetchPosts().subscribe(
      //Transforming data to match Post model
      postsData=> {
        transformedPosts = postsData.map(post=>{
          return {
            id: post._id,
            title: post.title,
            content: post.content
          };
        });
        this.posts = transformedPosts;
        this.pageLoaded = true;
      },
      err =>{
        this.pageLoaded = true;
      }
    )
  }

  //Function to delete a post
  deletePost(postId: string){
    this.postService.deletePost(postId)
      .subscribe(data=>{
        for(let j=0; j<this.posts.length; j++){
          if(this.posts[j].id === postId){
            this.posts.splice(j,1);
          }
        }
        // this.postDeleted.emit(postId); //Emitting post delete event to update posts locally
      })
  }
}
