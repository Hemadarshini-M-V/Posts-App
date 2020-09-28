import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../../post.model';
import { PostService } from '../../post-service/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  mode: string;
  editPostId: string;

  //Injecting Post service and activated route
  constructor(private postService: PostService, private aRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.aRoute.params.subscribe(params=>{
      if(params['postId']){
        this.mode = 'edit';
        this.editPostId = params['postId'];
      }
      else{
        this.mode = 'create';
        this.editPostId = null;
      }
    })
  }

  //Function to create a new post
  onNewPost(createPostForm: NgForm){
    if(createPostForm.invalid){
      return;
    }
    var userPost: Post = {
      "id": null,
      "title": createPostForm.value.postTitle,
      "content": createPostForm.value.postContent
    }
    this.postService.addPost(userPost).subscribe(serverRes=>{
      userPost.id = serverRes.id;  //Over-writing null id with id returned from backend
      createPostForm.resetForm();
    })

  }

}
