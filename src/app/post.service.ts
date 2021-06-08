import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { IPost } from './interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string;

  constructor() {
    this.baseUrl = "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/kvaas-giwjg/service/kvaas/incoming_webhook";
  }
  
  requestKey = () => {
    const f = fetch(this.baseUrl + "/new", {method: "POST"})
    .then(response => response.json(), error => alert(error))
    .then(key => {
      alert(key);
      return fetch(this.baseUrl + "/get?key=" + key, {method: "GET"})
      .then(response => response.json(), error => alert(error));
    });
    return f;
  }

  getData = (key: string, callback: any) => {
    return fetch(this.baseUrl + "/get?key=" + key, {method: "GET"})
    .then(response => response.json(), error => alert(error))
    .then(data => callback(data));
  }

  sendData = async (key: string, msg: {}) => {
    const r = await fetch(this.baseUrl + "/post?key=" + key + "&msg=" + JSON.stringify(msg), {method: "POST"});
    return r.json();
  }
}
