import { Component, OnInit } from '@angular/core';
import { EventService} from '../../event.service';

import { Router, ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { MatSnackBar} from '@angular/material';
import {Event} from '../../event.model';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  event: any = {};
  updateForm: FormGroup;

  constructor( private eventService: EventService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder, private loginService: LoginService) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      comments: ''
    });

  }

  ngOnInit() {
    this.authCheck();
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.eventService.getEventByID(this.id).subscribe((res) => {
        this.event = res;
        console.log('res: ' + res);
        console.log('Event: ' + this.event);
        this.updateForm.get('eventName').setValue(`${this.event.eventName}`);
        this.updateForm.get('location').setValue(`${this.event.location}`);

        this.updateForm.get('date').setValue(`${this.event.date}`);
        this.updateForm.get('comments').setValue(`${this.event.comments}`);
      });
    });
  }

  updateEvent(eventName, location, date, time, comments) {
    this.eventService.updateEvent(this.id, eventName, location, date, time, comments).subscribe( () => {
      this.snackBar.open('Event updated.  A message has been sent to all participants', 'OK', {duration: 2000});
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
