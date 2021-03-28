import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  getUniqueArray(array)
  {
    let uniqueArray = [...new Set(array)];
    return uniqueArray
  }

  sortArrayByDate(array)
  {
    array.sort(function(a, b) {
      var dateA = new Date(a.eventStartDate).getTime(), dateB = new Date(b.eventStartDate).getTime();
      return dateA - dateB;
  });
  return array
  }
  
}
