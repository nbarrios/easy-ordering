import { Component, Input, OnInit, Output } from '@angular/core';
import { NavParams, PopoverController, } from '@ionic/angular';
import { PopoverActions, PopoverEmitAction, PopoverService } from './popover.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  service: PopoverService;
  id: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(private popoverController: PopoverController, private navParams: NavParams) {
  }

  ngOnInit() {
    this.service = this.navParams.get('service');
    this.id = this.navParams.get('listId');
  }

  emitPopoverEvent(action: PopoverEmitAction){
    this.service.emitActionEvent(action);
    this.popoverController.dismiss();
  }

  async renameList(){
    const action = new PopoverEmitAction(this.id, PopoverActions.renameList);
    this.emitPopoverEvent(action);
  }

  async copyLink(){
    const action = new PopoverEmitAction(this.id, PopoverActions.copyLink);
    this.emitPopoverEvent(action);
  }

  async changeAccess(){
    const action = new PopoverEmitAction(this.id, PopoverActions.changeAccess);
    this.emitPopoverEvent(action);
  }

  async deleteList(){
    const action = new PopoverEmitAction(this.id, PopoverActions.deleteList);
    this.emitPopoverEvent(action);
  }

}


