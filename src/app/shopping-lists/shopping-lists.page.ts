import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component } from '@angular/core';
import { AlertController} from '@ionic/angular';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: 'shopping-lists.page.html',
  styleUrls: ['shopping-lists.page.scss']
})
export class ShoppingListsPage {
  items = [{
    name: 'Eggs'
  }, {
    name: 'Juice'
  }, {
    name: 'Bread'
  }];

  constructor(public alertCtrl: AlertController) {}

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
              if(name == null || name == '' || name.match(/^\s*$/) !== null) {
                return false;
              }
              else {
                this.items.push({ name });
              }
            }
          }
        ]
      }))
    .present();
  }

  async deleteItem(index) {
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
            handler: ( index ) => {
              this.items.splice(index, 1);
            }
          }
        ]
      }))
    .present();
  }
}