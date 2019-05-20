import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // 'http://localhost:3000'
  uri = 'https://event-serverrr.herokuapp.com';

  constructor(private http: HttpClient) { }
  googleLoginService() {
    console.log('service Triggered');
    window.location.href = `${this.uri}/auth/google`;
    return this.http.get(`${this.uri}/auth/google`);
  }
  getMessages() {
    return this.http.get(`${this.uri}/messages/allMessages`, {withCredentials: true});
  }
  getMessageDetails(id) {
    return this.http.get(`${this.uri}/messages/messageDetails/${id}`, {withCredentials: true});
  }
  getAuth() {
    return this.http.get(`${this.uri}/auth/serverAuth`, {withCredentials: true});
  }

}
