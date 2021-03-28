import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import * as CryptoJS from 'crypto-js'
import { LoadingController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  private secretKey: string = "mysecretkey";
  eventId: any;
  eventDetails: any;
  eventName: any;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventTime: string;
  contactName: any;
  email: any;
  phone: any;
  city: any;
  address: any;
  dob: any;
  wedAnniversary: any;
  eventCategory: any;
  todayDate: string;
  contactNumber: any;
  spouseName: any;
  eventDescription: any;
  referredBy: any;
  nameSelected: boolean;
  name: any;
  eventTitle: any;
  isBeliever : Boolean =false;
  additionalEventsForm: FormGroup;
  validation_messages = {
    'email': [
      { type: 'pattern', message: 'Enter a valid Email Id' }
    ],
    'contactNumber': [
      { type: 'pattern', message: 'Contact number must have only numbers' }
    ]
  }


  constructor(private formBuilder : FormBuilder,private toastController : ToastController,private router : Router,private loadingController : LoadingController,private storage : Storage,private route : ActivatedRoute,private httpService : HttpService) { }

  ngOnInit() {
    this.additionalEventsForm=this.formBuilder.group({
      email: [this.email, Validators.compose([Validators.maxLength(60), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
      contactNumber:[this.contactNumber, Validators.compose([Validators.maxLength(250), Validators.pattern('^[0-9]+$')])],
     })
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
            this.dob = this.eventDetails['dob'] ? this.eventDetails['dob'] : ""
            this.wedAnniversary = this.eventDetails['wedAnniversary'] ? this.eventDetails['wedAnniversary'] : ""
            this.address = this.eventDetails['eventAddress'] ? this.eventDetails['eventAddress'] : ""
            this.eventDescription = this.eventDetails['eventDescription'] ? this.eventDetails['eventDescription'] : ""
            this.referredBy = this.eventDetails['referredBy'] ? this.eventDetails['referredBy'] : ""
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

  async updateForm()
  {
    if(this.additionalEventsForm.valid)
    {
      let email = this.additionalEventsForm.get('email').value
      let contactNumber = this.additionalEventsForm.get('contactNumber').value

      console.log("Email",email)
      const loading = await this.loadingController.create({
        message : "Updating event details",
        translucent : true,
        showBackdrop : true,
        spinner : 'dots',
        mode: 'ios',
      });
      this.presentLoading(loading)
      let body = {
        _id : this.eventDetails['_id'],
        organiserName : this.name,
        eventTitle : this.eventTitle ? this.eventTitle : "",
        eventCategory : this.eventCategory ? this.eventCategory : "",
        contactName : this.contactName ? this.contactName : "",
        spouseName :this.spouseName ? this.spouseName : "",
        contactNumber : contactNumber ? contactNumber : "",
        email : email ? email : "",
        dob : this.dob ? this.dob : "",
        wedAnniversary : this.wedAnniversary ? this.wedAnniversary : "",
        eventAddress : this.address ? this.address : "",
        eventDescription : this.eventDescription ? this.eventDescription : "",
        referredBy : this.referredBy ? this.referredBy : "",
        eventLocation : this.city ? this.city : "",
        isBeliever : this.isBeliever
      }
  
      this.httpService.updateScheduleById(body).subscribe(res=>{
        // console.log("res",res)
        loading.dismiss();
        this.presentToast("Event updated successfully")
        this.router.navigateByUrl('/home')
      },err=>{
        // console.log("err",err)
        loading.dismiss();
      })
    }
    else
    {
      this.presentToast('Please check your email or phone number')
    }
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

checkToggleValue(event)
{
  this.isBeliever = event['detail']['checked']
}

async presentLoading(loading) {
  return await loading.present();
}

async presentToast(message) {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000
  });
  toast.present();
}

}
