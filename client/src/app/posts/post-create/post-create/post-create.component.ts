import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../../post.model';
import { PostService } from '../../post-service/post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  mode: string;
  editPostId: string;
  buttonContent: string;
  editablePost: Post;
  pageLoaded: boolean = false;

  //Injecting Post service and activated route
  constructor(private postService: PostService, private aRoute: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {
    this.pageLoaded = false;
    this.aRoute.params.subscribe(params=>{
      if(params['postId']){
        this.mode = 'edit';
        this.buttonContent = "Edit Post";
        this.editPostId = params['postId'];
        this.fetchPost(this.editPostId);
      }
      else{
        this.mode = 'create';
        this.buttonContent = "Save Post";
        this.editPostId = null;
        this.pageLoaded = true;
      }
    })
  }

  //Function to create a new post or edit existing post
  onSavePost(savePostForm: NgForm){
    if(savePostForm.invalid){
      return;
    }
    if(this.mode === 'create'){
      var userPost: Post = {
        "id": null,
        "title": savePostForm.value.postTitle,
        "content": savePostForm.value.postContent
      }
      this.postService.addPost(userPost).subscribe(serverRes=>{
        userPost.id = serverRes.id;  //Over-writing null id with id returned from backend
        savePostForm.resetForm();
        this.router.navigate(['/']);
      })
    }
    else if(this.mode === 'edit'){
      var userPost: Post = {
        "id": this.editPostId,
        "title": savePostForm.value.postTitle,
        "content": savePostForm.value.postContent
      }
      this.postService.editPost(userPost).subscribe(serverRes=>{
        savePostForm.resetForm();
        this.router.navigate(['/']);
      })
    }

  }

  //Function to fetch a particular post
  fetchPost(id: string){
    this.postService.fetchPost(id).subscribe(post=>{
      this.editablePost = post;
      this.pageLoaded = true;
    })
  }
}
