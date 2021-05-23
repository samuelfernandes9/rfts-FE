import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as moment from 'moment';

@Component({
  selector: 'app-enter-contact-details',
  templateUrl: './enter-contact-details.page.html',
  styleUrls: ['./enter-contact-details.page.scss'],
})
export class EnterContactDetailsPage implements OnInit {
  contactForm: FormGroup;
  todayDate = moment().toISOString()

  validation_messages = {
    'contactName': [
      { type: 'pattern', message: 'Contact name must cobntain only letters' },
      { type: 'required', message: "Contact's name is required" }
    ],
    'contactEmail': [
      { type: 'pattern', message: 'Enter a valid Email Id' },
      { type: 'required', message: "Contact's email is required" }
    ],
    'contactPhone': [
      { type: 'pattern', message: 'Contact number must have only numbers' },
      { type: 'required', message: "Contact's phone number is required" }

    ],
    'contactAddress': [
      { type: 'pattern', message: 'Contact number must have only numbers' },
      { type: 'required', message: "Contact's address is required" }
    ],
    'contactCity': [
      { type: 'pattern', message: 'Contact number must have only numbers' },
      { type: 'required', message: "Contact's city is required" }
    ],
    'contactDOB': [
      { type: 'required', message: "Contact's DOB is required" }
    ],
    'contactSpouseName': [
      { type: 'pattern', message: 'Contact number must have only numbers' },
      // { type: 'required', message: "Contact's spouse name is required" }
    ],
    'wedAnniversary': [
      // { type: 'required', message: "Contact's Wedding anniversary date is required" }
    ],
    'preferredLanguage': [
      { type: 'required', message: "Preferred Language is required" }
    ],

  }
  preferredLanguage: any;

  constructor(private httpService: HttpService, private utilitiesService: UtilitiesService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      contactName: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      contactEmail: ['', Validators.compose([Validators.maxLength(60), Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
      contactPhone: ['', Validators.compose([Validators.maxLength(250), Validators.required])],
      contactAddress: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      contactCity: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      contactDOB: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      contactSpouseName: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      wedAnniversary: ['', Validators.compose([Validators.maxLength(50), Validators.required])],
      preferredLanguage: ['', Validators.compose([Validators.maxLength(50), Validators.required])]

    })
  }

  submitContactDetails() {
    if (this.contactForm.valid) {
      let body = {
        contactName: this.contactForm.value.contactName,
        contactEmail: this.utilitiesService.encryptData(this.contactForm.value.contactEmail),
        contactPhone: this.utilitiesService.encryptData(this.contactForm.value.contactPhone),
        contactPreferredLanguage: this.preferredLanguage,
        contactAddress: this.contactForm.value.contactAddress,
        contactCity: this.contactForm.value.contactCity,
        contactDOB: this.utilitiesService.formatDate(this.contactForm.value.contactDOB, 'DD MMM YYYY'),
        contactSpouseName: this.contactForm.value.contactSpouseName,
        weddingAnniversary: this.contactForm.value.weddingAnniversary ? this.utilitiesService.formatDate(this.contactForm.value.wedAnniversary, 'DD MMM YYYY') : "",
      }
      console.log("Body: ", body)
      this.httpService.postContactDetails(body).subscribe(res => {
        console.log("Res: ", res)
      },
        err => {
          console.log("err: ", err);
        })
    }
    else {
      console.log("Form is invalid");
    }
  }

  checkCityValue() {
    console.log("City value: ", this.contactForm.value.contactCity)
  }

}
