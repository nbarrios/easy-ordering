import { Members } from './Members';
// Holds all detail of an active order card
export class OrderDetail{
    constructor(public storeName: string, public imgLink: string,
       public members: Members[], public groupMsg: string,
      public date: string){}
}
