import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  constructor(private loginService: LoginService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  messageID = this.route.snapshot.paramMap.get('id');
  messages: any = [];
  ngOnInit() {
    this.authCheck();
    this.loginService.getMessageDetails(this.messageID).subscribe( (data) => {
      console.log(data);
      this.messages.push(data);
    });
  }
  goBack() {
    this.router.navigate(['/messages']);
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
