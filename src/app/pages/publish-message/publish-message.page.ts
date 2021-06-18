import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageModalPage } from 'src/app/modals/image-modal/image-modal.page';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-publish-message',
  templateUrl: './publish-message.page.html',
  styleUrls: ['./publish-message.page.scss'],
})
export class PublishMessagePage implements OnInit {
  // @ViewChild('messageBody') messageBody: ElementRef;
  // public tools: object = {
  //   items: [
  //     'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
  //     'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
  //     'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
  //     'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
  //     'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable',
  //     'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
  // };
  messageBody: string = '';
  imageLink: any;
  subject: any;
  language: any;
  selectedImage = '';
  constructor(public modalController: ModalController, private httpService: HttpService) { }

  ngOnInit() {
  }

  submit() {
    // console.log(this.messageBody.nativeElement['innerHTML']);
    // console.log(document.getElementById('messageBody').innerText)
    console.log("Submit: ", this.messageBody);
    let body = {
      language: this.language,
      subject: this.subject,
      messageBody: this.messageBody,
      imageLink: this.imageLink,
    }
    // this.httpService.publishMailToAllBasedOnLanguage(body).subscribe(res => {
    //   console.log("Res: ", res)
    // },
    //   err => {
    //     console.log("err:", err)
    //   })

  }

  checkTextAreaInput(event) {
    console.log("testArea: ", event)
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ImageModalPage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss().then(data => {
      console.log("Modal data: ", data)
      this.selectedImage = data?.data?.imageUrl
    })
    return await modal.present();
  }

}
