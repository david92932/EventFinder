import { Component, OnInit } from '@angular/core';
import {Event} from '../../event.model';
import {EventService} from '../../event.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {LoginService} from '../../login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hostingEvents: Event[];
  attendingEvents: Event[];
  displayedColumns = ['numberAttending', 'eventName', 'location', 'date', 'actions'];

  constructor(private eventService: EventService, private router: Router, private snackBar: MatSnackBar, private loginService: LoginService) { }

  ngOnInit() {
    this.authCheck();
    this.getHostingEvents();
    // this.getAttendingEvents();
  }
  getHostingEvents() {
    this.eventService
      .getHostingEvents()
      .subscribe((data: Event[]) => {
        this.hostingEvents = data;
        console.log('Data Requested');
        console.log(this.hostingEvents);
      });
  }
  // getAttendingEvents() {
  //   this.eventService
  //   .getAttendingEvents()
  //   .subscribe((data: Event[]) => {
  //     this.attendingEvents = data;
  //     console.log('Data Requested');
  //     console.log(this.attendingEvents);
  //   });
  // }
  cancel(id) {
    this.eventService.cancel(id).subscribe((data) => {
      this.router.navigate(['/profile']);
      this.snackBar.open('Successfully Canceled - Message sent to all participants', 'OK', {duration: 3000});
    });
  }
  updateEvent(id) {
    this.router.navigate([`edit/${id}`]);
  }

  IMOUT(id) {
    this.eventService.IMOUT(id);
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
