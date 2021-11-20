import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';
import { PopoverEmitAction, PopoverService } from './popover/popover.service';





export class ShoppingLists{
  constructor(public name: string, public id: number){}
}

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})

export class ShoppingListsPage implements OnInit {
  shoppingList: ShoppingLists[];
  subscription: any;

  constructor(public popoverController: PopoverController, public popoverService: PopoverService) {
    this.shoppingList = [
      new ShoppingLists('Books list', 1), new ShoppingLists('Groceries list', 2)
    ];
  }
  ngOnInit(){
    this.subscription = this.popoverService.getpopoverActionEmitter()
        .subscribe(action => this.popoverAction(action));
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  //TODO change item to an object that has all details
  public async showPopover(ev: any, clickedItem: number){
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

  private popoverAction(action: PopoverEmitAction){
    console.log("POPOVER Action id is " + action.id);
  }
}
