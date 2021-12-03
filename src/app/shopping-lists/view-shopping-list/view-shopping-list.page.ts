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
  shoppingList: ShoppingList & {docID: string;} = null;
  //items: Item[] = null;

  constructor(public alertCtrl: AlertController,
     public listsProvider: ListProviderService, public activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    let listId = '';
    this.activatedRoute.paramMap.subscribe( (paramMap) => {
      if (!paramMap.has('listId')) {
        console.log('No doc id ');
        return;
      }
      listId = paramMap.get('listId');
  });
  console.log('doc id received');
    console.log(listId);

    this.listsProvider.getList(listId).subscribe(
      val => {this.shoppingList = val;
      console.log("Subscribed")});
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
                this.shoppingList.items.push(created);
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
              this.shoppingList.items.splice(index, 1);
              this.listsProvider.updateList(this.shoppingList);
            }
          }
        ]
      }))
    .present();
  }
}
