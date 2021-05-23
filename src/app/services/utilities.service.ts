import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js'
import * as moment from 'moment';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  secretKey = ""
  constructor() { }

  getUniqueArray(array) {
    let uniqueArray = [...new Set(array)];
    return uniqueArray
  }

  sortArrayByDate(array) {
    array.sort(function (a, b) {
      var dateA = new Date(a.eventStartDate).getTime(), dateB = new Date(b.eventStartDate).getTime();
      return dateA - dateB;
    });
    return array
  }

  encryptData(dataToEncrypt) {
    return CryptoJS.AES.encrypt(JSON.stringify(dataToEncrypt), environment.cryptSecret).toString();
  }

  formatDate(date, format) {
    return moment(date).format(format)
  }

  getDataForEntireWeek(array, occasion) {
    let result;
    let weekStartDate = moment().isoWeekday(1).format('DD-MM');  //monday
    let weekEndDate = moment().isoWeekday(7).format('DD-MM');    //Sunday
    if (occasion === 'birthday') {
      result = array.filter(f => {
        return moment(f.contactDOB).format('DD-MM') >= weekStartDate && moment(f.contactDOB).format('DD-MM') <= weekEndDate
      })
    }
    else if (occasion === 'weddingAnniversary') {
      result = array.filter(f => {
        return moment(f.weddingAnniversary).format('DD-MM') >= weekStartDate && moment(f.weddingAnniversary).format('DD-MM') <= weekEndDate
      })
    }
    return result
  }

}
