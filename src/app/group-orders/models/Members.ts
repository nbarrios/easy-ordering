import { v4 as uuidv4 } from 'uuid';
// Model used to hold status of other members an active order card.
export class Member{
  public iconLink: string;
    constructor(
      public userId: string = '',
      public name: string = '',
      public pickupList: string[] = [],
      public orderStatus: OrderStatus = OrderStatus.notFilled){
        switch(orderStatus){
          case OrderStatus.filled: {
            this.iconLink = '/assets/icon/filled.svg';
            break;
          }
          case OrderStatus.notFilled:{
            this.iconLink = '/assets/icon/notFilled.svg';
            break;
          }
          case OrderStatus.declined:{
            this.iconLink = '/assets/icon/declined.svg';
            break;
          }
        }
      }
}

// Define status of the user in the chip, located in an active order card
// used to show the state of each user if they have filled the order yet.
export enum OrderStatus {
    filled,
    notFilled,
    declined
}
