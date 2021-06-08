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
      await this.postService.requestKey(key => {
        this.inviaChiave(key);
      });
    } else {
      await this.postService.getData(key, data => {
        this.key = key;
        var obj = JSON.parse(data);
        for(var i in obj) {
          let post = new Post();
          post.importante = obj[i].importante;
          post.titolo = obj[i].titolo;
          post.contenuto = obj[i].contenuto;
          this.posts.push(post);
        }
      })
    }
  }
}
