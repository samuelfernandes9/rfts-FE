import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { HttpService } from 'src/app/services/http.service';
import * as CryptoJS from 'crypto-js'


@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.page.html',
  styleUrls: ['./view-details.page.scss'],
})
export class ViewDetailsPage implements OnInit {
  private secretKey: string = "mysecretkey";
  eventId: any;
  todayDate: any;
  nameSelected: boolean = false;
  name: any;
  eventDetails: any;
  eventTitle: any;
  eventDate: any;
  city: any;
  eventTime: string;
  eventCategory: any;
  contactName: any;
  spouseName: any;
  contactNumber: any;
  email: any;
  dob: any;
  wedAnniversary: any;
  address: any;
  eventDescription: any;
  referredBy: any;
  isBeliever = false;

  constructor(private httpService : HttpService,private route : ActivatedRoute,private storage : Storage ) { }

  ngOnInit() {
    if (this.route.snapshot.data['special']) {
      this.eventId = this.route.snapshot.data['special'];
    }

    this.storage.get('name').then(name=>{
      if(name)
      {
        this.name = name
        this.nameSelected = true
        this.todayDate = moment().toISOString()      
          // console.log("event id in details : ",this.eventId)
          this.httpService.getScheduleById(this.eventId).subscribe(res=>{
            // console.log("ress",res)
            this.eventDetails = res['data']
            this.eventTitle = this.eventDetails['eventTitle']
            this.eventDate = this.getFormattedDate(this.eventDetails.eventStartDate,"DD MMM YYYY")
            this.city = this.eventDetails['eventLocation'] ? this.eventDetails['eventLocation'] : ""
            this.eventTime = this.getFormattedDate(this.eventDetails.eventStartDate,"hh:mm a")+" - "+this.getFormattedDate(this.eventDetails.eventEndDate,"hh:mm a")
            this.eventCategory = this.eventDetails['eventCategory'] ? this.eventDetails['eventCategory'] : ""
            this.contactName = this.eventDetails['contactName'] ? this.eventDetails['contactName'] : ""
            this.spouseName = this.eventDetails['spouseName'] ? this.eventDetails['spouseName'] : ""
            this.contactNumber = this.eventDetails['contactNumber'] ? this.eventDetails['contactNumber'] : ""
            this.email = this.eventDetails['email'] ? this.eventDetails['email'] : ""
            this.dob = this.eventDetails['dob'] ? this.getFormattedDate(this.eventDetails['dob'],'DD MMM YYYY') : ""
            this.wedAnniversary = this.eventDetails['wedAnniversary'] ? this.getFormattedDate(this.eventDetails['wedAnniversary'],'DD MMM YYYY') : ""
            this.address = this.eventDetails['eventAddress'] ? this.eventDetails['eventAddress'] : ""
            this.eventDescription = this.eventDetails['eventDescription'] ? this.eventDetails['eventDescription'] : ""
            this.referredBy = this.eventDetails['referredBy'] ? this.eventDetails['referredBy'] : "",
            this.isBeliever = this.eventDetails['isBeliever']
          })
      }
      else
      {
        this.nameSelected = false
      }
    })
  }
  
  getFormattedDate(date,format)
  {
    return moment(date).format(format)
  }

  encryptData(dataToEncrypt)
  {
    return CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt),this.secretKey).toString();
  }

  decryptData(dataToEncrypt)
{
  let bytes = CryptoJS.AES.decrypt(dataToEncrypt,this.secretKey);
  let data =JSON.parse(bytes.toString(CryptoJS.enc.Utf8));  
  return data
}

}
