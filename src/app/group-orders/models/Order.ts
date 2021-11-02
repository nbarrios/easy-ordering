import { Member } from './Members';
import { v4 as uuidv4 } from 'uuid';
// Holds all detail of an active order card
export class Order {
  constructor(
    public orderId: uuidv4,
    public storeName: string,
    public pickupAddress: string,
    public imgLink: string,
    public members: Member[],
    public groupMsg: string,
    public date: string,
    public isActive: boolean
  ) {}
}
