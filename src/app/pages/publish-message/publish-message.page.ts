import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-publish-message',
  templateUrl: './publish-message.page.html',
  styleUrls: ['./publish-message.page.scss'],
})
export class PublishMessagePage implements OnInit {
  @ViewChild('messageBody') messageBody: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  submit() {
    console.log(this.messageBody.nativeElement['innerHTML']);
    console.log(document.getElementById('messageBody').innerText)
  }

}
