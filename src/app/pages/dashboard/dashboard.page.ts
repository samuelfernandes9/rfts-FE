import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import * as moment from 'moment'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  dashboardData = 'contactsTable'
  columnDefs = [
    { field: 'Contact Name' },
    { field: 'Contact Email' },
    { field: 'Contact Phone' },
    { field: 'Contact Address' },
    { field: 'Contact City' },
    { field: 'Contact DOB' },
    { field: 'Spouse Name' },
    { field: 'Wedding Anniversary' },
  ];

  rowData: any
  contactDetails: any;
  birthdayArray: any = [];
  birthdayWeekArray: any;
  weddingAnniversaryWeekArray: any

  constructor(private httpService: HttpService, private utilitiesService: UtilitiesService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.httpService.getContactDetails().subscribe(res => {
      console.log("Res: ", res);
      if (res) {
        this.contactDetails = res['data'];
        // this.contactDetails = this.contactDetails.filter(f => {
        //   let dateDOB = moment(f.contactDOB).format("DD-MM")
        //   let todayDate = moment().format('DD-MM')
        //   return dateDOB === todayDate
        // })
        // console.log('contactAfterFilter: ', this.contactDetails)
        this.birthdayWeekArray = this.utilitiesService.getDataForEntireWeek(this.contactDetails, 'birthday');
        this.weddingAnniversaryWeekArray = this.utilitiesService.getDataForEntireWeek(this.contactDetails, 'weddingAnniversary');


        console.log('birthdayWeek: ', this.birthdayWeekArray);
        console.log('weddingAnniversaryWeek: ', this.weddingAnniversaryWeekArray)

        this.rowData = res['data'].map((m, i) => {
          return {
            'Contact Name': m.contactName,
            'Contact Email': m.contactEmail,
            'Contact Phone': m.contactPhone,
            'Contact Address': m.contactAddress,
            'Contact City': m.contactCity,
            'Contact DOB': this.utilitiesService.formatDate(m.contactDOB, 'DD MMM YYYY'),
            'Spouse Name': m.contactSpouseName ? m.contactSpouseName : '-',
            'Wedding Anniversary': m.weddingAnniversary ? this.utilitiesService.formatDate(m.weddingAnniversary, 'DD MMM YYYY') : "-"
          }
        })
      }
    },
      err => {
        console.log("Err: ", err)
      })
  }

}
