import { Component, OnInit } from '@angular/core';
import { EventService} from '../../event.service';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import {min} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {LoginService} from '../../login.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;

  constructor(private eventService: EventService, private loginService: LoginService, private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.createForm = this.fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      picker: ['', Validators.required],
      timePicker: ['', Validators.required],
      comments: ''
    });
  }
  addEvent(eventName, location, date, time, comments) {
    this.eventService.addEvent(eventName, location, date._validSelected, time, comments).subscribe((data: any) => {
      this.snackBar.open(data, 'OK', {duration: 3000});
      this.router.navigate(['/list']);
    });
  }
  testEvent(eventName, location, date, time, comments) {
    console.log(eventName);
    console.log(location);
    console.log(date._validSelected);
    console.log(time.selectedHour, time.selectedMinute, time.selectedPeriod);
    console.log(comments);
  }

  ngOnInit() {
    this.authCheck();
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
