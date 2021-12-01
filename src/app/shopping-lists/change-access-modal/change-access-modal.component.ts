import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalController, IonRadioGroup } from '@ionic/angular';
import { ListProviderService } from '../list-provider.service';
import { ShoppingList, ShoppingListAccess } from '../models/ShoppingList';

@Component({
  selector: 'app-change-access-modal',
  templateUrl: './change-access-modal.component.html',
  styleUrls: ['./change-access-modal.component.scss'],
})
export class ChangeAccessModalComponent implements OnInit {
@Input() shoppingList: ShoppingList;
@ViewChild('radioGroup') radioGroup: ElementRef<IonRadioGroup>;

disabledlinkSharing: ShoppingListAccess = ShoppingListAccess.linkSharingDisabled;
viewValue = 'view';
viewAndEditValue = 'viewAndEdit';
checkedValue = '';
  constructor(private modalController: ModalController, public listProvider: ListProviderService) {
  }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.setRadioButton();
  }

  setRadioButton(){
    if(this.shoppingList.access === ShoppingListAccess.view){
      this.checkedValue = 'view';
    }else{
      this.checkedValue = 'viewAndEdit';
    }
  }

  dismissModal(){
    this.listProvider.updateList(this.shoppingList);
    this.modalController.dismiss();
  }

  setListAccessToView(){
    this.shoppingList.access = ShoppingListAccess.view;
  }

  setListAccessToViewAndEdit(){
    this.shoppingList.access = ShoppingListAccess.viewAndEdit;
  }

  toggleLinkAccess(){
    if(this.shoppingList.access !== ShoppingListAccess.linkSharingDisabled){
      this.shoppingList.access = ShoppingListAccess.linkSharingDisabled;
    }else{
      this.shoppingList.access = ShoppingListAccess.view;
    }
    this.setRadioButton();
  }
}
