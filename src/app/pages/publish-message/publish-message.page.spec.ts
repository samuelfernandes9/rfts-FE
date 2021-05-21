import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PublishMessagePage } from './publish-message.page';

describe('PublishMessagePage', () => {
  let component: PublishMessagePage;
  let fixture: ComponentFixture<PublishMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PublishMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
