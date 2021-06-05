import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { IPost } from './interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  key: string;
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/progetto-yffrz/service/progetto/incoming_webhook";
  }

  getKey = () => this.key;

  request = (key: string = null) => {
    if(key == null) {
      return this.requestKey();
    } else {
      this.key = key;
      return this.getData(key);
    }
  }
  
  private requestKey = () => {
    const f = fetch(this.baseUrl + "/new", {method: "POST"})
    .then(response => response.json(), error => alert(error))
    .then(key => {
      this.key = key;
      return fetch(this.baseUrl + "/get?key=" + key, {method: "GET"})
      .then(response => response.json(), error => alert(error));
    });
    return f;
  }

  private getData = async (key: string) => {
    const r = await fetch(this.baseUrl + "/get?key=" + key, {method: "GET"});
    return r.json();
  }

  sendData = async (key: string, msg: {}) => {
    const r = await fetch(this.baseUrl + "/post?key=" + key + "&msg=" + JSON.stringify(msg), {method: "POST"});
    return r.json();
  }
}
