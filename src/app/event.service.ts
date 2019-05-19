import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  getEvents() {
    return this.http.get(`${this.uri}/events/`);
  }
  addEvent(eventName, location, date, time, comments) {
    date = date + '';
    const hour = time.selectedHour.time;
    let minute = time.selectedMinute.time;
    const AMPM = time.selectedPeriod;
    const dateFound = date.search('00') - 1;
    const formattedDate = date.slice(0, dateFound);
    let AMPMS;
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (AMPM === 'PM') {
      AMPMS = 'P.M.';
    } else {
      AMPMS = 'A.M.';
    }
    const formattedTime = hour + ':' + minute + ' ' + AMPMS;
    const newEvent = {
      eventName,
      location,
      date: formattedDate,
      time: formattedTime,
      comments
    };
    return this.http.post(`${this.uri}/events/newEvent`, newEvent, {withCredentials: true});
  }

  updateEvent(id, eventName, location, date, time, comments) {

    date = date + '';
    const hour = time.selectedHour.time;
    let minute = time.selectedMinute.time;
    const AMPM = time.selectedPeriod;
    const dateFound = date.search('00') - 1;
    const formattedDate = date.slice(0, dateFound);
    let AMPMS;
    if (minute < 10) {
      minute = '0' + minute;
    }
    if (AMPM === 'PM') {
      AMPMS = 'P.M.';
    } else {
      AMPMS = 'A.M.';
    }
    const formattedTime = hour + ':' + minute + ' ' + AMPMS;
    const updateEvent = {
      id,
      eventName,
      location,
      date: formattedDate,
      time: formattedTime,
      comments
    };
    return this.http.post(`${this.uri}/events/update`, updateEvent, {withCredentials: true});
  }

  // For list page - adds participant to list attending
  attending(id) {
    const attendingObject = {
      eventID: id
    };
    return this.http.post(`${this.uri}/events/attending`, attendingObject, {withCredentials: true});
  }

  // For profile - removes participant
  IMOUT(id) {
    const removeObject = {
      eventID: id
    };
    return this.http.post(`${this.uri}/events/remove`, removeObject, {withCredentials: true});
  }

  // For Details page
  getEventByID(id) {
    console.log('getEventByID triggered ');
    return this.http.get(`${this.uri}/events/details/${id}`);
  }

  // For Profile Page
  getHostingEvents() {
    return this.http.get(`${this.uri}/profile/hosting`, {withCredentials: true});
  }
  // For Profile Page
  getAttendingEvents() {
    return this.http.get(`${this.uri}/profile/attending`, {withCredentials: true});
  }
  cancel(id) {
    const sendObject = {
      eventID: id
    };
    return this.http.post(`${this.uri}/events/cancel`, sendObject, {withCredentials: true});
  }

  // addEvent(name, location, date, comments, host) {
  //   const event = {
  //     name: name,
  //     location: location,
  //     date: date,
  //     comments: comments,
  //     host: host
  //   };
  //   return this.http.post(`${this.uri}/issues/add`, event);
  // }

}
