import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../../config'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  postSchedule(body) {
    const headers = new HttpHeaders({
      "Content-Type": 'application/json'
    });
    return this.http.post(apiUrl + '/schedule/postSchedule', body, { headers })
  }

  getSchedule() {
    return this.http.get(apiUrl + '/schedule/getSchedule')
  }

  updateScheduleById(body) {
    const headers = new HttpHeaders({
      "Content-Type": 'application/json'
    });
    return this.http.put(apiUrl + '/schedule/updateScheduleById', body, { headers })
  }

  removeEventById(id) {
    let options =
    {
      headers: { 'Content-Type': 'application/json' }
    }
    return this.http.delete(apiUrl + '/schedule/removeEventById/' + id, options)
  }

  postFCMToken(body) {
    const headers = new HttpHeaders({
      "Content-Type": 'application/json'
    });

    return this.http.post(apiUrl + '/fcm/postFCMToken', body, { headers })
  }

  postLog(body) {
    const headers = new HttpHeaders({
      "Content-Type": 'application/json'
    });

    return this.http.post(apiUrl + '/logs/postLog', body, { headers })
  }

  getLog() {
    return this.http.get(apiUrl + '/logs/getLog')
  }

  sendEmail(body) {
    const headers = new HttpHeaders({
      "Content-Type": 'application/json'
    });

    return this.http.post(apiUrl + '/schedule/sendEmail', body, { headers })
  }

  postEmail(body)  //to collect email
  {
    const headers = new HttpHeaders({
      "Content-Type": 'application/json'
    });

    return this.http.post(apiUrl + '/email/postEmail', body, { headers })
  }

  getScheduleById(id) {
    return this.http.get(apiUrl + '/schedule/getScheduleById/' + id)
  }

  postContactDetails(body) {
    const headers = new HttpHeaders({
      "Content-Type": 'application/json'
    });

    return this.http.post(apiUrl + '/contacts/postContact', body, { headers })
  }

  getContactDetails() {
    return this.http.get(apiUrl + '/contacts/getContactList');
  }
}
