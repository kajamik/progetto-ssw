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
    //test
    this.inviaChiave("74950381");
  }
  inviaChiave = (key: string = null) => {
    if(key == null) {
      this.postService.requestKey().then(data => {
        
      });
    } else {
      this.postService.getData(key, data => {
        var obj = JSON.parse(data);
        alert(obj);
      })
    }
  }
}
