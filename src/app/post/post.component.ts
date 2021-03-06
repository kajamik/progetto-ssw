import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Post } from '../app.component';
import { PostService } from '../post.service';

@Component({
  selector: 'post-root',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() posts: Array<Post>;
  @Input() key: string;
  creazione_post: boolean;
  post_visualizzato: number;
  ngOnInit(): void { }
  constructor(private postService: PostService) {
    this.creazione_post = false;
    this.post_visualizzato = -1;
  }
  // crea un nuovo post
  creaPost = async (titolo: string, contenuto: string, importante: string) => {
    if(titolo.trim().length !== 0 && contenuto.trim().length !== 0) {
      var post = new Post();
      post.importante = Number(importante);
      post.titolo = titolo;
      post.contenuto = contenuto;
      this.posts.push(post);
      await this.postService.sendData(this.key, this.posts);
      this.creazione_post = false;
    } else {
      alert("Non puoi creare un post vuoto");
    }
  }
  eliminaPost = (id: number) => {
    this.posts.splice(id, 1);
    this.postService.sendData(this.key, this.posts);
  }
  visualizzaPost = (id: number) => {
    if(this.post_visualizzato == -1) {
      this.post_visualizzato = id;
    } else {
      this.post_visualizzato = -1;
    }
  }
}
