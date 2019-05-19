import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { MatTableDataSource} from '@angular/material';
import {MatSnackBar} from '@angular/material';

import { EventService} from '../../event.service';
import { Event} from '../../event.model';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  events: Event[];
  displayedColumns = ['numberAttending', 'eventName', 'location', 'date', 'time', 'actions'];

  constructor(private eventService: EventService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService
      .getEvents()
      .subscribe((data: Event[]) => {
        this.events = data;
        console.log('Data Requested');
        console.log(this.events);
        });

  }

  IMIN(id) {

    this.eventService
      .attending(id).subscribe((data) => {
        console.log(data);
        this.snackBar.open(data.toString(), 'OK', {duration: 3000});
        this.router.navigate(['/list']);
    });
  }

  getDetails(id) {
    this.router.navigate([`/details/${id}`]);
  }

}
