import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { images } from '../../../extras/image-modal'

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  imagesArray: { url: string; }[];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.imagesArray = images.birthday
  }

  closeModal(imageUrl) {
    this.modalController.dismiss({
      imageUrl: imageUrl
    });
  }

}
