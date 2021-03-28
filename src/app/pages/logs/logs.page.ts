import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';
import {readonly} from 'config'
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {
  logData = [];
  filterEventName: any;
  originalData: any;
  readonly: boolean;
  nameSelected: boolean;
  descendingLogData: any[];
  descendingOriginalData: any[];

  constructor(private storage : Storage,private httpService : HttpService) { }

  ngOnInit() {
    this.storage.get('name')
    .then(res=>{
      if(res)
      {

        this.nameSelected= true;
        this.getLogs();
      }
      else
      {
        this.nameSelected =false
      }
    })
  }

  ionViewWillEnter()
  {
    this.readonly= readonly 
    
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
    // console.log(this.readonly+" "+this.nameSelected)
    if(!this.readonly && this.nameSelected){
     this.getLogs()
    }
    else  
    {
      // console.log("Readonly mode or name not present")
    }

  }

  getLogs()
  {
    this.httpService.getLog().subscribe(res=>{
      this.originalData = res['data']
      this.descendingOriginalData = [...this.originalData].reverse()
      this.logData = res['data']
      // this.logData = this.logData.reverse()
      this.descendingLogData = [...this.logData].reverse();
      
    })
  }

  getFormattedDate(date)
  {
    return moment(date).format('DD MMM YY hh:mm a')
  }

  filterData()
  {
    this.descendingLogData = this.descendingOriginalData
    // console.log("filterEvent",this.filterEventName)
    this.descendingLogData = this.descendingLogData.filter(f=>{
      return String(f.title).toLowerCase().indexOf(String(this.filterEventName).toLowerCase()) > -1 || String(f.userName).toLowerCase().indexOf(String(this.filterEventName).toLowerCase()) > -1    
    })
    // console.log("LOG after filter : ",this.logData)
  }

  checkInput()
  {
    if(!this.filterEventName)
    {
      this.descendingLogData = this.descendingOriginalData
    }
  }

}
