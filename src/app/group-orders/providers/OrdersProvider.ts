/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Member, OrderStatus } from '../models/Members';
import { Order } from '../models/Order';

/* todo replace when switching to service
@Injectable({
  providedIn: 'root'
})
*/

@Injectable()
export class OrdersProvider {
  /**Active orders */
  // Order 0
  private pickupList: string[] = [];
  private userStatus: Member[] = [
    new Member('7c1861d4-874c-4c76-bfe1-c83167a3870e', 'Jerry',
    ['1 Steam Vegetarian Dumplings', 'Scallion Pancake Plate'], OrderStatus.notFilled),
    new Member('4d3c40c4-55fd-4fb3-aed6-f6702f460468', 'Samantha',
    ['2 Egg Rolls Plate', '1 Fried Chicken Wings Plate'], OrderStatus.filled),
    new Member('21d70472-f704-4de2-9f03-f404c7954261', 'Clarice',
     this.pickupList, OrderStatus.notFilled),
    new Member('07c91968-ef9f-40c9-946a-6f3398e37216', 'Muhammad',
     this.pickupList, OrderStatus.notFilled),
    new Member('4533e0a2-d2c5-4357-92b6-075fc6e705a8', 'Carlos',
     this.pickupList, OrderStatus.declined),
  ];
  private order: Order = new Order(
    'abec5545-4a3a-4ba0-b479-8731c3207813',
    'Northern Cafe',
    '9305 Reseda Blvd, Northridge CA 91324',
    'assets/icons/order-icon.svg',
    this.userStatus,
    'We\'re sharing a soup...',
    'Today',
    true
  );

  // Order 1
  private members1: Member[] = [
    new Member('97e60c70-46e9-4b91-b298-10d06819839f', 'Rylie',
     this.pickupList, OrderStatus.declined),
    new Member('2d6d92b5-eae7-4d97-a351-91fc8d93524e', 'Blake',
     this.pickupList, OrderStatus.notFilled),
    new Member('5c9ef7de-3f2c-4ad9-a9a7-6dfe7048b9a3', 'Jaqueline',
     ['Supreme Nachos'], OrderStatus.filled),
    new Member('38514eb8-8ec2-4b2e-be3d-2c676085201c', 'Denzel',
    this.pickupList, OrderStatus.declined),
  ];
  private order1: Order = new Order(
    '721c6dbe-ce8a-4601-9ce6-46d97dddc302',
    'Mexican Cuisine',
    'No Address provided',
    'assets/icons/order-icon.svg',
    this.members1,
    'We\'re getting tacos',
    'Today',
    true
  );

  /** Previous orders */
  // Order 2
  private members2: Member[] = [
    new Member('08d7e481-eb30-46ae-96db-956ae8d19836', 'Khang', ['Chicken Fried Rice'], OrderStatus.filled),
    new Member('74a86daf-637b-4a30-bbcf-ab1e8005b24d', 'Paul', ['Mapo Tofu'], OrderStatus.filled),
    new Member('0f0d4413-9b73-4ac3-a2ec-12c2726a1ed0', 'Mike', this.pickupList, OrderStatus.notFilled),
    new Member('e5b10cf7-914d-4b84-a9cc-f1efcafd41ad', 'Vero', this.pickupList, OrderStatus.notFilled),
    new Member('23226a19-7b21-43ec-9796-b0877120f099', 'Tim', this.pickupList, OrderStatus.notFilled),
    new Member('fb9e8318-e21c-4aad-9162-f8f12ab8b1c5', 'Lawrence', this.pickupList, OrderStatus.notFilled),
  ];
  private order2: Order = new Order(
    '38cf3843-c044-448a-87d1-c849b35f7ff7',
    'Mama Hong',
    'No Address provided',
    'assets/icons/order-icon.svg',
    this.members2,
    'Empty message group',
    '10/14/2020',
    false
  );

  // Order 3
  private members3: Member[] = [
    new Member('e0562261-7425-42ba-9209-0b1b1f284e5c', 'Jimmy', ['1 Oreo McFlurry'], OrderStatus.filled),
    new Member('e0cc3274-cea0-4354-981c-9b31216eeaa4', 'Sal', ['2 Happy meals',], OrderStatus.filled),
    new Member('6f23fd0f-274a-45d0-ae34-8b3ac387c58b', 'Meg', this.pickupList, OrderStatus.notFilled),
    new Member('a4f65527-ea41-4b17-893a-158b99d905ab', 'Rooster', this.pickupList, OrderStatus.notFilled),
  ];
  private order3: Order = new Order(
    'f55afd11-5975-41f5-8e60-d9de35487439',
    'McDonald\'s',
    '9305 Reseda BLvd, Northridge CA 91324',
    'assets/icons/order-icon.svg',
    this.members3,
    'Empty message group',
    '11/02/2020',
    false
  );

  // Order 4
  private members4: Member[] = [
    new Member('84513c8a-ef28-43b7-8b86-d15438f1a162', 'Mike', ['1 Whopper Jr. Meal'], OrderStatus.filled),
    new Member('587a7546-a4c7-4af3-97aa-ec38d7c00cd4', 'Rooster', ['16Pc Chicken nuggets'], OrderStatus.filled),
    new Member('5baa1ca2-a14d-4ee3-8685-3536ccbc7e37', 'Vero', this.pickupList, OrderStatus.notFilled),
    new Member('fd952792-3292-46a4-addc-b7aca2a3875d', 'Tim', this.pickupList, OrderStatus.notFilled),
    new Member('f34b9f9b-c3bd-4f82-972a-7adba490e7dc', 'Lawrence', this.pickupList, OrderStatus.notFilled),
    new Member('93920af9-9e86-4d83-a1c5-f532a723e917', 'Jasmine', this.pickupList, OrderStatus.notFilled),
  ];
  private order4: Order = new Order(
    '06d90992-1245-4dcb-8f27-63ae2924e2d8',
    'King\'s Burger',
    'No Address provided',
    'assets/icons/order-icon.svg',
    this.members4,
    'Empty message group',
    '10/14/2020',
    false
  );

  ordersList: Order[] = [
    this.order,
    this.order1,
    this.order2,
    this.order3,
    this.order4
  ];

  public getAllPreviousOrders(): Order[] {
    const previousList = this.ordersList.filter((o: Order) => o.isActive === false);
    return previousList;
  }

  public getAllActiveOrders(): Order[] {
    const activeList = this.ordersList.filter((o: Order) => o.isActive === true);
    return activeList;
  }

  public getOrder(id: string): Order{
    for(let i = 0; i < this.ordersList.length; i++){
      console.log("i : " + i + " id is : " + this.ordersList[i].orderId);
      if(this.ordersList[i].orderId === id)
        {return this.ordersList[i];}
    }
    //console.log('returning order '  + id + ' with store' + order[0].storeName);
    return null;
  }
}
