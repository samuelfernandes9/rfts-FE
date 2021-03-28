import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  eventDetails =[];
  nameSelected: boolean = false;
  filterEventName: any;
  ogArray = [];

  constructor(private storage : Storage,private utils : UtilitiesService,private router : Router,private httpService : HttpService,private dataService : DataService) { }

  ngOnInit() {
    this.storage.get('name')
    .then(res=>{
      if(res)
      {

        this.nameSelected= true;
      }
      else
      {
        this.nameSelected =false
      }
    })
    
    this.httpService.getSchedule().subscribe(res=>{
      // console.log('res',res)
      // this.eventDetails = res['data']
      this.ogArray = this.utils.sortArrayByDate(res['data'])
      this.eventDetails = this.utils.sortArrayByDate(res['data'])
    })
  }

  getFormattedDate(date,format)
{
  return moment(date).format(format)
}

gotoEventDetails(data)
{
  // console.log("data",data)

  this.dataService.setData(1,data)
  this.router.navigateByUrl('/event-details/1')
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
