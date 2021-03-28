import { Component, OnInit, ViewChild } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, ActionEventArgs, ScheduleComponent, WorkHoursModel, ToolbarActionArgs, ExportOptions, PopupOpenEventArgs } from '@syncfusion/ej2-angular-schedule';
import * as moment from 'moment';
import { Schedule, Day, Week, WorkWeek } from '@syncfusion/ej2-schedule';
import { HttpService } from 'src/app/services/http.service';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';
import { Storage } from '@ionic/storage';
import { readonly } from '../../../../config'
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { createElement, extend } from '@syncfusion/ej2-base';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as CryptoJS from 'crypto-js'
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// import {File} from '@ionic-native/file/ngx';
// import * as XLSX from 'xlsx';


Schedule.Inject(Day, Week, WorkWeek);

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private secretKey: string = "mysecretkey";
  @ViewChild('scheduleObj',{static:false})scheduleObj: ScheduleComponent;
  public startHour = '18:00'
  public endHour = '22:00'
  public data =[];
  public eventSettings: EventSettingsModel;
  eventDetails: any;
  minDate: Date;
  maxDate: Date;
  public scheduleHours: WorkHoursModel;
  name: any;
  nameSelected: boolean=false;
  readonlyFlag: boolean;
  excelData : any;
  rawData: any;
  sortedData = [];
  originalData =[];
  todaysEvent = [];
  email: any;
  locationArray = [];
  cityArray =[];
  filterCity: String = '';
  ogSchedulerData: any[];
  eventStatus: string;
  userDetailsForm : FormGroup
  validation_messages = {
    'email': [
      { type: 'pattern', message: 'Enter a valid Email ID' }
    ],
  }
  
  

  constructor(private formBuilder : FormBuilder,private router : Router,public dataService : DataService,public alertController : AlertController,public utils : UtilitiesService,public loadingController : LoadingController,private platform:Platform,private storage : Storage,private toastController : ToastController,private httpService : HttpService) { }

  ngOnInit() {
    this.userDetailsForm=this.formBuilder.group({
      email: [this.email, Validators.compose([Validators.maxLength(60), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
     })
   
    this.minDate = new Date(2020, 10, 1);
        this.maxDate = new Date(2021, 4, 31);
        this.checkName();
        // if(this.nameSelected)
        // {
        //   this.getSchedule();
        // }
    
  }

  ionViewWillEnter()
  {

    // console.log("Date : ",moment().toDate())
    this.readonlyFlag = readonly
    this.checkName();
    // if(this.nameSelected)
    // {
    //   this.getSchedule();
    // }
   
  }

  onActionBegin(args: ActionEventArgs & ToolbarActionArgs)
  {
    if (args.requestType === 'eventChange') { //while editing the existing event 
      let eventDetails = args['data']

      let body = {
        _id : eventDetails['Id'],
        organiserName : this.name,
        eventLocation : eventDetails['Location'],
        eventTitle : eventDetails['Subject'],
        eventDescription : eventDetails['Description'],
        eventStartDate : eventDetails['StartTime'],
        eventEndDate : eventDetails['EndTime']
     }
     this.httpService.updateScheduleById(body).subscribe(res=>{
      //  console.log("res",res)
       this.presentToast("Event updated successfully")
     },
     err=>{
      //  console.log("err",err)
       this.presentToast("Event dates cannot be updated. To change the dates, delete this event and create a new one")
       this.getSchedule();
     })
  } 
  if (args.requestType === 'eventCreate') { //while creating new event 
      // console.log("args : ",args['data'])
      let eventDetails = args['data'][0]
      let time = moment(eventDetails['StartTime']).toISOString();
      if(moment(time).isAfter(moment()))
      {
      let body = {
        organiserName : this.name,
        eventLocation : eventDetails['Location'] ? eventDetails['Location'].trim().toUpperCase() : "",
        eventTitle : eventDetails['Subject'],
        eventDescription : eventDetails['Description'] ? eventDetails['Description'] : "",
        eventStartDate : eventDetails['StartTime'],
        eventEndDate : eventDetails['EndTime']
     }
     

     this.httpService.postSchedule(body).subscribe(res=>{
      //  console.log("res",res)
       this.getSchedule();
       this.presentToast("Event posted successfully")
       //Post log request
       let logBody = {
        userName : res['data']['organiserName'],
        eventId : res['data']['_id'],
        status : "created",
        title : res['data']['eventTitle'],
        description : res['data']['eventDescription'],
        eventStartDate : res['data']['eventStartDate'],
        eventEndDate : res['data']['eventEndDate']
       }
       this.httpService.postLog(logBody).subscribe(res=>{
        // console.log("res",res)
       },
       err=>{
        //  console.log("err",err)
       })
     },
     err=>{
      //  console.log("err",err)
      //  this.presentToast("This time slot is already booked. Please pick a different time slot")
       this.getSchedule();
     })
      }
      else
      {
        this.presentToast('Past events cannot be created')
        this.getSchedule();
      }
      
  } 

  if(args.requestType === 'eventRemove')
  {
    let eventDetails = args['data'][0]
    // console.log("eventDetails",eventDetails)
    let time = moment(eventDetails['StartTime']).toISOString();
    if(moment(time).isAfter(moment()))
    {
      this.httpService.removeEventById(eventDetails['Id']).subscribe(res=>{
        // console.log('res',res)
        this.presentToast("Event deleted successfully")
        this.getSchedule()
        let logBody = {
          userName : this.name,
          eventId : res['data']['_id'],
          status : "deleted",
          title : res['data']['eventTitle'],
          description : res['data']['eventDescription'],
          eventStartDate : res['data']['eventStartDate'],
          eventEndDate : res['data']['eventEndDate']
         }
         this.httpService.postLog(logBody).subscribe(res=>{
          // console.log("res",res)
         },
         err=>{
          //  console.log("err",err)
         })
      },
      err=>{
        // console.log("err",err)
      })
    }

    else
    {
      this.presentToast('Past events cannot be deleted')
      this.getSchedule();
    }
  }
  }



  getSchedule()
  {
    console.log("filtercity",this.filterCity)
    this.httpService.getSchedule().subscribe(res=>{
      this.originalData = res['data']
      let locArr= this.originalData.map(m=>{
        return m.eventLocation.toUpperCase()
      })
  
      this.cityArray = this.utils.getUniqueArray(locArr)
      // console.log('loc filtered arr',this.locationArray)
      // console.log('todays events : ',this.todaysEvent)
      this.sortedData = res['data']
      // console.log("Original data",this.originalData)
      this.data = res['data'].map((m,index)=>{
        let mappedArray = {
          Id : m._id,
          Subject : m.eventTitle,
          StartTime : m.eventStartDate,
          EndTime : m.eventEndDate,
          Location : m.eventLocation,
          Description : m.organiserName+": "+m.eventDescription,
        }
        return mappedArray
      })
      this.ogSchedulerData = this.data
      // console.log("dataaaaa",this.data)
      this.todaysEvent = this.getEventsForToday(this.data)

   
    // console.log("Sorted data : ",this.sortedData)

    this.eventSettings = {
      allowEditing: false, 
      dataSource: this.data,
      fields: {
        id: 'Id',
        subject: { name: 'Subject', validation: { required: true } },
        location: { name: 'Location', title:"City", validation: { required: true } },
        description: { name: 'Description'},
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } }
    }
    }
    if(this.filterCity != '')
      {
        this.filterByCity()
      }
    })    
  }

  // getStoragePath()
  //   {
  //       let file = this.file;
  //       return this.file.resolveDirectoryUrl(this.file.externalRootDirectory).then(function (directoryEntry) {
  //           return file.getDirectory(directoryEntry, "RFTS App", {
  //               create: true,
  //               exclusive: false
  //           }).then(function () {
  //               return directoryEntry.nativeURL + "RFTS App/";
  //           });
  //       });
  //   }

    // exportToExcel()
    // {
    //   let fileName = 'EventList'+moment().format('DDMMMYYYYhhmma')+'.xlsx'
    //   console.log("fileName : ",fileName)
    //   // console.log("dttaa",this.data)
    //   // this.excelData = this.data.map(m=>{
    //   //   let mappedArray = {
    //   //     Subject : m.Subject,
    //   //     StartTime : m.StartTime,
    //   //     EndTime : m.EndTime,
    //   //     Location : m.Location,
    //   //     Description : m.Description
    //   //   }
    //   //   return mappedArray
    //   // })
    //   // console.log("Excel data :",this.excelData)
    //   let sheet = XLSX.utils.json_to_sheet(this.data);
    //     let wb = {
    //         SheetNames: ["export"],
    //         Sheets: {
    //             "export": sheet
    //         }
    //     };

    //     let wbout = XLSX.write(wb, {
    //         bookType: 'xlsx',
    //         bookSST: false,
    //         type: 'binary'
    //     });

    //     function s2ab(s) {
    //         let buf = new ArrayBuffer(s.length);
    //         let view = new Uint8Array(buf);
    //         for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    //         return buf;
    //     }

    //     let blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'});
    //     let self = this;
    //     this.getStoragePath().then(function (url) {
    //         self.file.writeFile(url, fileName, blob).then(() => {
    //             alert("file created at: " + url);
    //         }).catch(() => {
    //             alert("error creating file at :" + url);
    //         });
    //     });
    // }

  doRefresh(event)
  {
    this.getSchedule();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  submitName()
  {
    // console.log("encrypted email : ",this.encryptData(this.email))
    if(this.name && this.userDetailsForm.valid)
    {
      this.storage.set("name",this.name).then(()=>{
      this.checkName()
    })
    this.storage.set('email',this.email)
    if(this.platform.is('cordova'))
    {
      this.storage.get("fcmToken").then(fcmToken=>{
        let body = {
          fcmToken :fcmToken,
          name : this.name
        }
        this.httpService.postFCMToken(body).subscribe(res=>{
          // console.log("FCM Res : ",res)
        })
      })
    }

    let emailBody = {
      name : this.name,
      email : this.email
    }
      this.httpService.postEmail(emailBody).subscribe(res=>{
        // console.log("res",res)
      })
      this.getSchedule()
    }
    else
    {
      this.presentToast('Please enter your name and valid email address')
    }
  }

  checkName()
  {
    this.storage.get('name')
    .then(res=>{
      if(res)
      {
        this.name = res;
        this.nameSelected = true
        this.getSchedule();
      }
      else
      {
        this.nameSelected =false;
      }
    })
  }

  async sendEmail()
  {
    this.storage.get('email')
    .then(async res=>{
      this.email = res
      const loading = await this.loadingController.create({
        message : "Sending email report",
        translucent : true,
        showBackdrop : true,
        spinner : 'dots',
        mode: 'ios',
      });
      let body={
        email : this.email
      }
      this.presentLoading(loading)
      this.httpService.sendEmail(body).subscribe(res=>{
        // console.log("res",res)
        if(res)
        {
          loading.dismiss();
          this.presentToast(res['message'])
        }
      },
      err=>{
        loading.dismiss();
      })
    })
    

  }

  async presentLoading(loading) {
    return await loading.present();
  }

  getEventsForToday(eventArray)
{
  // console.log("Inside method :",eventArray)
  let today = moment().format('DD-MM-YY'); 
  // console.log("today",today)
  let result = eventArray.filter(f=>{
    return moment(f.StartTime).format('DD-MM-YY') == today
  })
     result = result.sort(function(a, b) {
        var dateA = new Date(a.StartTime).getTime(), dateB = new Date(b.StartTime).getTime();
        return dateA - dateB;
    });
  return result
}

getFormattedDate(date,format)
{
  return moment(date).format(format)
}

isTimeAhead(date)
{
  return moment(date).isAfter(moment())
}

// onPopupOpen(args: PopupOpenEventArgs): void {
//   if (args.type === 'Editor') {
//       // Create required custom elements in initial time
//       if (!args.element.querySelector('.custom-field-row')) {
//           let row: HTMLElement = createElement('div', { className: 'custom-field-row' });
//           let formElement: HTMLElement = <HTMLElement>args.element.querySelector('.e-schedule-form');
//           formElement.firstChild.insertBefore(row, args.element.querySelector('.e-title-location-row'));
//           let container: HTMLElement = createElement('div', { className: 'custom-field-container' });
//           let inputEle: HTMLInputElement = createElement('input', {
//               className: 'e-field', attrs: { name: 'EventType' }
//           }) as HTMLInputElement;
//           container.appendChild(inputEle);
//           row.appendChild(container);
//           let drowDownList: DropDownList = new DropDownList({
//               dataSource: [
//                   { text: 'Youth', value: 'youth' },
//                   { text: 'Senior Citizen', value: 'senior citizen' },
//                   { text: "Women's", value: "women's" },
//                   { text: 'Family', value: 'family' },
//                   { text: "Men's", value: "men's" },
//                   {text : "Teens",value : "teens"},
//                   {text : "Office",value : "office"},
//                   {text : "Neighbour",value : "neighbour"},
//                   {text : "Friends",value : "friends"},
//                   {text : "Society",value : "society"},
//                   // office,society, neighbor and friends

//                   //fields : reffered by

//               ],
//               fields: { text: 'text', value: 'value' },
//               value: (args.data as { [key: string]: Object }).EventType as string,
//               floatLabelType: 'Always', placeholder: 'Event Category'
//           });
//           drowDownList.appendTo(inputEle);
//           inputEle.setAttribute('name', 'EventCategory');
//       }
//   }
// }

viewChange(event)
     {
        // console.log('event change : ',event)
        if(event.currentView=='WorkWeek')
        {
          this.startHour = '18:00'
          this.endHour = '22:00'
        }
        else if(event.currentView=='Week')
        {
          this.startHour = '08:00'
          this.endHour = '22:00'
        }
     }

     filterByCity()
     {
       this.data = this.ogSchedulerData
       if(this.filterCity != 'all')
       {
        // console.log("filter city : ",this.filterCity)
        this.data = this.data.filter(f=>{
         return String(f.Location).toLowerCase().indexOf(String(this.filterCity).toLowerCase()) > -1 
       })

      this.eventSettings = {
        allowEditing: false, 
        dataSource: this.data,
        fields: {
          id: 'Id',
          subject: { name: 'Subject', validation: { required: true } },
          location: { name: 'Location', title:"City", validation: { required: true } },
          description: { name: 'Description'},
          startTime: { name: 'StartTime', validation: { required: true } },
          endTime: { name: 'EndTime', validation: { required: true } }
      }
      }
      //  console.log("filteredData : ",this.data)
       }
       else if(this.filterCity == 'all') {
        this.data = this.ogSchedulerData
       }

       this.eventSettings = {
        allowEditing: false, 
        dataSource: this.data,
        fields: {
          id: 'Id',
          subject: { name: 'Subject', validation: { required: true } },
          location: { name: 'Location', validation: { required: true } },
          description: { name: 'Description'},
          startTime: { name: 'StartTime', validation: { required: true } },
          endTime: { name: 'EndTime', validation: { required: true } }
      }
      }
     }

  encryptData(dataToEncrypt)
  {
    return CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt),this.secretKey).toString();

    // let bytes = CryptoJS.AES.decrypt(this.phone,this.secretKey);
    // let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));      Code for decryption
    // console.log("Decrypted phone : ",data)
  }

  checkDate(startDate,endDate)
  {
    if(moment().isBetween(startDate,endDate))
    {
      this.eventStatus = 'Ongoing'
    }
    else if(moment(startDate).isAfter(moment()))
    {
      this.eventStatus = "Upcoming"
    }
    else if(moment(endDate).isBefore(moment())){
      this.eventStatus = "Completed"
    }
    return this.eventStatus
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want to receive schedule report via email?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
      
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.sendEmail()
            // console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  gotoEventDetails(id)
  {
    this.dataService.setData(3,id)
    this.router.navigateByUrl('/view-details/3')
  }



}

