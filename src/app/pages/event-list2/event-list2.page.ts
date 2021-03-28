import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-event-list2',
  templateUrl: './event-list2.page.html',
  styleUrls: ['./event-list2.page.scss'],
})
export class EventList2Page implements OnInit {
  eventDetails =[];
  ogArray: any[];
  filterEventName: any;

  constructor(private dataService : DataService,private router : Router,private httpService : HttpService,private utils : UtilitiesService) { }

  ngOnInit() {
    this.httpService.getSchedule().subscribe(res=>{
      // console.log('res',res)
      // this.eventDetails = res['data']
      this.eventDetails = this.utils.sortArrayByDate(res['data'])
      this.ogArray = this.utils.sortArrayByDate(res['data'])
    })
  }

  getFormattedDate(date,format)
  {
    return moment(date).format(format)
  }

  gotoEventDetails(data)
  {
    // console.log("data",data)
    this.dataService.setData(2,data)
    this.router.navigateByUrl('/view-details/2')
  }

  checkInput()
{
  if(!this.filterEventName)
  {
    this.eventDetails = this.ogArray
  }
}

filterData()
  {
    this.eventDetails = this.ogArray
    // console.log("filterEvent",this.filterEventName)
    this.eventDetails = this.eventDetails.filter(f=>{
      return String(f.eventTitle).toLowerCase().indexOf(String(this.filterEventName).toLowerCase()) > -1 || String(f.eventLocation).toLowerCase().indexOf(String(this.filterEventName).toLowerCase()) > -1
    })
    // console.log("data after filter : ",this.eventDetails)
  }

}
