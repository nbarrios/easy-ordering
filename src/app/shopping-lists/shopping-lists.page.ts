import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PopoverController, ModalController, ToastController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { PopoverActions, PopoverEmitAction, PopoverService } from './popover/popover.service';
import { ChangeAccessModalComponent } from './change-access-modal/change-access-modal.component';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {v4 as uuidv4} from 'uuid';
import { ShoppingList, ShoppingListAccess } from './models/ShoppingList';
import { FirebaseService } from '../firebase.service';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})

export class ShoppingListsPage implements OnInit {
  @ViewChild('listName') el: ElementRef;
  //shoppingLists: ShoppingList[];
  shoppingLists: ShoppingList[];
  editListName = -1;
  subscription: any;

  constructor(public popoverController: PopoverController,
     public popoverService: PopoverService,
     public modalController: ModalController,
     public toastController: ToastController,
     //private clipboard: Clipboard
     ) {
    this.shoppingLists = [
      new ShoppingList('Books list', uuidv4()), new ShoppingList('Groceries list', uuidv4())
    ];
  }

  ngOnInit(){
    this.subscription = this.popoverService.getpopoverActionEmitter()
        .subscribe(action => this.popoverAction(action));
        //this.presentModal(this.shoppingLists[1]);
  }

  ngAfterViewInit(){
    this.el.nativeElement.focus(); //Not working!
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  //TODO change item to an object that has all details
  public async showPopover(ev: any, clickedItem: string){
    console.log('clicked item is ' + clickedItem);
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      //cssClass: 'my-custom-class',
      event: ev,
      componentProps: {service: this.popoverService, listId: clickedItem},
      translucent: true
    });

    await popover.present();


    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  public addNewList(){
    console.log('Adding new item to shopping list');
    this.shoppingLists.push(new ShoppingList('', uuidv4())); //TODO Create unique id for each
    this.editListName = this.shoppingLists.length -1;
  }

  resetEditListName(){
    this.editListName = -1;
  }

  private async presentModal(list: ShoppingList) {
    console.log(list.access);
    const modal = await this.modalController.create({
      component: ChangeAccessModalComponent,
      //cssClass: 'my-custom-class',
      componentProps: {
        // eslint-disable-next-line quote-props
        'shoppingList': list
      }
    });
    return await modal.present();
  }

  private popoverAction(emited: PopoverEmitAction){
    switch(emited.action){
      case PopoverActions.renameList:{
        this.renameList(emited.id);
        break;}
      case PopoverActions.copyLink:{
        this.copyLink(emited.id);
        break;}
      case PopoverActions.changeAccess:{
        this.changeAccess(emited.id);
        break;}
      case PopoverActions.deleteList:{
        this.deleteList(emited.id);
        break;}
    }
  }

  private renameList(id: string){
    this.editListName = this.getIndex(id);
    //this.el.nativeElement.focus();
  }

  private getIndex(id: string): number{
    const len = this.shoppingLists.length;
    let i = 0;
    while(i < len){
      if(this.shoppingLists[i].id === id){
        return i;
      }
      i++;
    }
    return -1;
  }

  private copyLink(id: string){
    // Clipoard not working !
    //this.clipboard.copy('Also links are not yet implemented');
    const i = this.getIndex(id);
    if(i > 0){
      this.shoppingLists[i].access = ShoppingListAccess.view;
      this.presentToast();
    }
  }

  private async presentToast(){
    const toast = await this.toastController.create({
      header: 'Link copied to clipboard',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-circle-outline',
          text: '',
        },
        {
          text: 'Dismiss',
          role: 'cancel',
          handler: () => {
            toast.dismiss();
          }
        }
      ],
      duration: 3000
    });
    await toast.present();

    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  private changeAccess(id: string){
    const list = this.shoppingLists.filter(e => e.id === id);
    if(list.length > 0){
      this.presentModal(list[0]);
    }
  }

  private deleteList(id: string){
      this.shoppingLists = this.shoppingLists.filter(e => e.id !== id);
  }


}
