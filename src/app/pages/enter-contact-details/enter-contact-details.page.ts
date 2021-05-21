import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enter-contact-details',
  templateUrl: './enter-contact-details.page.html',
  styleUrls: ['./enter-contact-details.page.scss'],
})
export class EnterContactDetailsPage implements OnInit {
  contactForm: FormGroup;
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

  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      contactName: ['', Validators.compose([Validators.maxLength(50)])],
      contactEmail: ['', Validators.compose([Validators.maxLength(60), Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
      contactPhone: ['', Validators.compose([Validators.maxLength(250), Validators.pattern('^[0-9]+$')])],
      contactAddress: ['', Validators.compose([Validators.maxLength(50)])],
      contactCity: ['', Validators.compose([Validators.maxLength(50)])],
      contactDOB: ['', Validators.compose([Validators.maxLength(50)])],
      contactSpouseName: ['', Validators.compose([Validators.maxLength(50)])],
      wedAnniversary: ['', Validators.compose([Validators.maxLength(50)])],
    })
  }

}
