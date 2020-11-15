import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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
  postsLength = 0;
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fetchPosts(this.pageSize, 1);
    this.pageLoaded = false;
  }

  // Function to fetch posts from backend
  fetchPosts(pageSize, currentPage) {
    var transformedPosts = [];
    this.pageLoaded = false;
    this.postService.fetchPosts(pageSize, currentPage).subscribe(
      // Transforming data to match Post model
      postsData => {
        transformedPosts = postsData.documents.map(post => {
          return {
            id: post._id,
            title: post.title,
            content: post.content,
            imagePath: post.imagePath
          };
        });
        this.posts = transformedPosts;
        this.postsLength = postsData.allPostsCount;
        this.pageLoaded = true;
      },
      err => {
        this.pageLoaded = true;
      }
    )
  }

  // Function to delete a post
  deletePost(postId: string) {
    this.pageLoaded = false;
    this.postService.deletePost(postId)
      .subscribe( data => {
        this.fetchPosts(this.pageSize, this.currentPage);
      });
  }

  onPageChanged(pageData : PageEvent) {
    this.pageLoaded = false;
    this.pageSize = pageData.pageSize;
    this.currentPage = pageData.pageIndex + 1;
    this.fetchPosts(this.pageSize, this.currentPage);
  }
}
