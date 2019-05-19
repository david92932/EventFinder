import { Component, OnInit } from '@angular/core';
import {EventService} from '../../event.service';

import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormGroup, FormBuilder, Validators  } from '@angular/forms';

import { Event} from '../../event.model';

import {MatSnackBar} from '@angular/material';
import {LoginService} from '../../login.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  // , private params: ParamMap
  constructor(private eventService: EventService, private route: ActivatedRoute, private snackBar: MatSnackBar, private loginService: LoginService, private router: Router) { }

  eventID = this.route.snapshot.paramMap.get('id');
  events: any = [];
  ngOnInit() {
    this.authCheck();
    this.eventService.getEventByID(this.eventID).subscribe((rEvent) => {
      console.log('rEvent: ' + rEvent);
      this.events.push(rEvent);
    });
  }
  IMIN(id) {
    this.eventService.attending(id).subscribe( (data) => {
      this.snackBar.open(data + '', 'OK', {duration: 3000});
    });
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
