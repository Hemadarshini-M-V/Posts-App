import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from '../../post.model';
import { PostService } from '../../post-service/post.service';
import { mimeType } from './mime-type.validator';


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
  postForm: FormGroup;
  imgPreview: string;

  // Injecting Post service and activated route
  constructor(private postService: PostService, private aRoute: ActivatedRoute,
                private router: Router) {}

  ngOnInit(): void {
    this.postForm = new FormGroup({
      'title': new FormControl(null,
        {validators: [Validators.required, Validators.minLength(3)]}
      ),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {asyncValidators: [mimeType]})
    });
    this.pageLoaded = false;
    this.aRoute.params.subscribe(params => {
      if (params['postId']) {
        this.mode = 'edit';
        this.buttonContent = "Edit Post";
        this.editPostId = params['postId'];
        this.fetchPost(this.editPostId);
      }
      else {
        this.mode = 'create';
        this.buttonContent = "Save Post";
        this.editPostId = null;
        this.pageLoaded = true;
      }
    })
  }

  // Function to create a new post or edit existing post
  onSavePost() {
    if (this.postForm.invalid) {
      return;
    }
    if (this.mode === 'create') {
      // Creating form data object to be sent to back-end
      var postFormData = new FormData();
      postFormData.append("title", this.postForm.value.title);
      postFormData.append("content", this.postForm.value.content);
      if (this.imgPreview!=null && this.imgPreview!='' && this.imgPreview!=undefined) {
        postFormData.append("image", this.postForm.value.image,
        this.postForm.value.title);
      }
      else
        postFormData.append("image", "");
      this.postService.addPost(postFormData).subscribe(serverRes => {
        // userPost.id = serverRes.id;  //Over-writing null id with id returned from backend
        this.postForm.reset();
        this.router.navigate(['/']);
      });
    }
    else if (this.mode === 'edit') {
      var userPost: Post | FormData;
      let postImg = this.postForm.value.image;
      if (typeof postImg == "string") {
        userPost = {
          "id": this.editPostId,
          "title": this.postForm.value.title,
          "content": this.postForm.value.content,
          "imagePath": this.postForm.value.image
        }
      }
      else if (typeof postImg == "object") {
        userPost = new FormData();
        userPost.append("id", this.editPostId);
        userPost.append("title", this.postForm.value.title);
        userPost.append("content", this.postForm.value.content);
        if (this.imgPreview!=null && this.imgPreview!='' && this.imgPreview!=undefined) {
          userPost.append("image", this.postForm.value.image,
          this.postForm.value.title);
        }
        else
          userPost.append("image", "");
      }
      this.postService.editPost(userPost).subscribe(serverRes => {
        this.postForm.reset();
        this.router.navigate(['/']);
      })
    }
  }

  // Function to fetch a particular post
  fetchPost(id: string) {
    this.postService.fetchPost(id).subscribe(post => {
      this.editablePost = post;
      this.postForm.setValue(
        {'title': this.editablePost.title,'content': this.editablePost.content,
          'image': this.editablePost.imagePath}
      );
      this.pageLoaded = true;
    });
  }

  // Function to append image file name to form data and image preview
  onImagePicked(event: Event) {
    var imgFile = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({'image': imgFile});
    this.postForm.get('image').updateValueAndValidity();
    var reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    }
    reader.readAsDataURL(imgFile);
  }
}
