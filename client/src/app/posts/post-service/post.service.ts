import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  //Function to fetch all posts from backend
  fetchPosts(): Observable<any[]>{
    return this.httpClient.get<any[]>("http://localhost:3000/fetchPosts");
  }

  //Function to add new post
  addPost(newPost):Observable<{"message":string,"id":string}>{
    return this.httpClient.post<{"message":string,"id":string}>("http://localhost:3000/addPost",newPost);
  }

  //Function to delete post
  deletePost(postId: string):Observable<{"message":string}>{
    return this.httpClient.delete<{"message":string}>("http://localhost:3000/deletePost/"+postId);
  }
}
