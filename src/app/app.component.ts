import { Component } from '@angular/core';
import { IPost } from './interfaces/post';
import { PostService } from './post.service';

export class Post implements IPost {
  importante: boolean;
  titolo: string;
  contenuto: string;
}
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Array<Post>;
  key: string;
  constructor(private postService: PostService) {
    this.posts = new Array<Post>();
  }
  inviaChiave = async (key: string = null) => {
    if(key == null) {
      const k = await this.postService.requestKey();
      this.inviaChiave(k);
    } else {
      const data = await this.postService.getData(key, data => data);
      if(!data.error) {
        this.key = key;
        var obj = JSON.parse(data);
      for(var i in obj) {
          let post = new Post();
          post.importante = obj[i].importante;
          post.titolo = obj[i].titolo;
          post.contenuto = obj[i].contenuto;
          this.posts.push(post);
        }
      } else {
        alert("Chiave non valida");
      }
    }
  }
}
