import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PracticeModePage } from './practice-mode.page';

describe('PracticeModePage', () => {
  let component: PracticeModePage;
  let fixture: ComponentFixture<PracticeModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeModePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
