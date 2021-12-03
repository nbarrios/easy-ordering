import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController} from '@ionic/angular';
import { ListProviderService } from '../list-provider.service';
import { Item as Item, ShoppingList } from '../models/ShoppingList';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: 'view-shopping-list.page.html',
  styleUrls: ['view-shopping-list.page.scss']
})
export class ViewShoppingListPage implements OnInit {
  shoppingList: ShoppingList;
  shoppingListID: string;
  items: Item[] = null;

  constructor(public alertCtrl: AlertController,
     public listsProvider: ListProviderService, public activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('listId')) {
        console.log('No doc id ');
        return;
      }
      console.log('doc id received');
    const listId = paramMap.get('listId');
    console.log(listId);
    this.listsProvider.getList(listId).subscribe(val => {
      this.shoppingList = val; //HERE
    });

    //This code checks for null before the code marked HERE is ever run
      if(this.shoppingList == null){
        console.log("shoppinglist is null");
      }else console.log("shoppinglist is not null");

       /*if (this.shoppingList != null && this.shoppingList.items == null) {
          this.shoppingList.items = new Array<Item>();
          this.items = this.shoppingList.items;
        }
        else if (this.shoppingList != null) {
          this.items = this.shoppingList.items;
        }*/
  });
  }

  async addItem() {
    const alert = (await this.alertCtrl
      .create({
        header: 'Add Item',
        inputs: [
          {
            name: 'name',
            placeholder: 'Input item'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Add',
            handler: ({ name }) => {
              if(name == null || name ==='' || name.match(/^\s*$/) !== null) {
                return false;
              }
              else {
                const created = new Item();
                created.name = name;
                created.done = false;
                this.items.push(created);
                this.listsProvider.updateList(this.shoppingList);
              }
            }
          }
        ]
      }))
    .present();
  }

  async deleteItem(index: number) {
    const alert = (await this.alertCtrl
      .create({
        header: 'Delete Item?',
        buttons: [
          {
            text: 'No',
            role: 'cancel'
          },
          {
            text: 'Yes',
            handler: () => {
              this.items.splice(index, 1);
              this.listsProvider.updateList(this.shoppingList);
            }
          }
        ]
      }))
    .present();
  }
}
