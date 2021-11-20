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
  id: number;
  // eslint-disable-next-line @typescript-eslint/member-ordering

  constructor(private popoverController: PopoverController, private navParams: NavParams) {
  }

  ngOnInit() {
    this.service = this.navParams.get('service');
    this.id = this.navParams.get('listId');

    console.log("id is : " + this.id);
    this.emitPopoverEvent(new PopoverEmitAction(this.id, PopoverActions.renameList));
  }

  emitPopoverEvent(action: PopoverEmitAction){
    this.service.emitActionEvent(action);
  }

}


