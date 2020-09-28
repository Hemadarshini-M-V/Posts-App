import { Component } from '@angular/core';
import { Post } from './posts/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Krishna';
  // storedPosts: Post[] = [];

  // //Updating stored posts when a new post is added at the backend
  // onPostAdded(newPost){
  //   this.storedPosts.push(newPost);
  // }

  // //Updating stored posts once posts are fetched from backend
  // onPostsFetched(posts){
  //   this.storedPosts = posts;
  // }

  // //Updating stored posts when a post has been successfully deleted at the backend
  // deletePost(id){
  //   for(let i=0;i<this.storedPosts.length;i++){
  //     if(this.storedPosts[i].id == id){
  //       this.storedPosts.splice(i,1);
  //       break;
  //     }
  //   }
  // }
}
