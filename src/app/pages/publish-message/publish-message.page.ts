import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-publish-message',
  templateUrl: './publish-message.page.html',
  styleUrls: ['./publish-message.page.scss'],
})
export class PublishMessagePage implements OnInit {
  // @ViewChild('messageBody') messageBody: ElementRef;
  public tools: object = {
    items: [
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
      'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  };
  messageBody: any;
  constructor() { }

  ngOnInit() {
  }

  submit() {
    // console.log(this.messageBody.nativeElement['innerHTML']);
    // console.log(document.getElementById('messageBody').innerText)
    console.log("Submit: ", this.messageBody);
  }

  checkTextAreaInput(event) {
    console.log("testArea: ", event)
  }

}
