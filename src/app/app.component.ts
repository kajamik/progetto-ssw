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
      const datas = await this.postService.getData(key, data => JSON.parse(data));
      if(!datas.error) {
        this.key = key;
        if(Object.keys(datas).length > 0) {
          let data = datas.filter(item => item.importante == 1);
          for(var item of data) {
            let post = new Post();
            post.importante = item.importante;
            post.titolo = item.titolo;
            post.contenuto = item.contenuto;
            this.posts.push(post);
          }
        }
      } else {
        alert("Chiave non valida");
      }
    }
  }
}
