import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventList2Page } from './event-list2.page';

describe('EventList2Page', () => {
  let component: EventList2Page;
  let fixture: ComponentFixture<EventList2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventList2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventList2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
