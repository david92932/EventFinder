import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../login.service';
import { Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  messages: any;
  messageID: any;
  displayedColumns = ['Read', 'Sender', 'Subject', 'Actions'];
  ngOnInit() {
    this.authCheck();
    this.loginService.getMessages().subscribe( (data) => {
      this.messages = data;
      console.log('Messages Retrieved');
      console.log(this.messages);
    });
  }
  messageDetails(id) {
    this.router.navigate([`/messageDetails/${id}`]);
  }
  authCheck() {
    this.loginService.getAuth().subscribe( (data) => {
      console.log('Data: ' + data);
      if (data === 0) {
        this.router.navigate(['/login']);
        this.snackBar.open('You are not logged in', 'OK', {duration: 3000});
      }
    });
  }

}
