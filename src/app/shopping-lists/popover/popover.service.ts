import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class PopoverService{
  popoverEmitter: EventEmitter<PopoverEmitAction> = new EventEmitter();
  constructor(){}
  emitActionEvent(action: PopoverEmitAction){
    this.popoverEmitter.emit(action);
  }

  getpopoverActionEmitter(){
    return this.popoverEmitter;
  }
}

export enum PopoverActions{
  renameList,
  copyLink,
  changeAccess,
  deleteList
}

export class PopoverEmitAction{
  constructor(public id: string, public action: PopoverActions){}
}
