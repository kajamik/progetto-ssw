import { Component } from '@angular/core';
import { IPost } from './interfaces/post';
import { PostService } from './post.service';

export class Post implements IPost {
  importante: boolean;
  titolo: string;
  contenuto: string;
  //background: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Array<Post>;
  key: string;
  constructor(private postService: PostService) {
    this.posts = new Array<Post>();
    //test
    this.inviaChiave("ij9n4x");
  }
  inviaChiave = (key: string = null) => {
    this.postService.request(key).then(data => {
      this.key = this.postService.getKey();
      if(data.length > 0) {
        for(var x of data) {
          var post = new Post();
          post.importante = x.importante;
          post.titolo = x.titolo;
          post.contenuto = x.contenuto;
          this.posts.push(post);
        }
      }
    })
    .catch(keyNotFound => alert("La chiave non esiste"));
  }
}
