import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
//import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { ViewShoppingListPage } from './view-shopping-list.page';

describe('ShoppingListsPage', () => {
  let component: ViewShoppingListPage;
  let fixture: ComponentFixture<ViewShoppingListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ViewShoppingListPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewShoppingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
