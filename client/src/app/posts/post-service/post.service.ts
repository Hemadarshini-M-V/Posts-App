import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {}

  // Function to fetch all posts from backend
  fetchPosts(pageSize, currentPage): Observable <any> {
    var queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    return this.httpClient.get<any> ("http://localhost:3000/fetchPosts"+ queryParams);
  }

  // Function to fetch a particular post
  fetchPost(id): Observable <any> {
    return this.httpClient.get<any> ("http://localhost:3000/fetchPost/"+ id);
  }

  // Function to add new post
  addPost(newPost): Observable <{"message": string, "id": string, "imagePath": string}> {
    return this.httpClient.post <{"message": string, "id": string, "imagePath": string}> ("http://localhost:3000/addPost", newPost);
  }

  // Function to edit a post
  editPost(postToBeEdited): Observable <{"message": string}> {
    var postId =  postToBeEdited.id;
    return this.httpClient.put <{"message": string}> ("http://localhost:3000/editPost/"+ postId, postToBeEdited);
  }

  // Function to delete post
  deletePost(postId: string): Observable <{"message": string}> {
    return this.httpClient.delete <{"message": string}> ("http://localhost:3000/deletePost/"+ postId);
  }
}
