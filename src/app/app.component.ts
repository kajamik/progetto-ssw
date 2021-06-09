import { Component } from '@angular/core';
import { IPost } from './interfaces/post';
import { PostService } from './post.service';

export class Post implements IPost {
  titolo: string;
  contenuto: string;
  importante: number;
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
      const data = await this.postService.getData(key, data => JSON.parse(data).filter(value => value.importante == 1));
      if(!data.error) {
        this.key = key;
      for(var i in data) {
          let post = new Post();
          post.importante = data[i].importante;
          post.titolo = data[i].titolo;
          post.contenuto = data[i].contenuto;
          this.posts.push(post);
        }
      } else {
        alert("Chiave non valida");
      }
    }
  }
}
