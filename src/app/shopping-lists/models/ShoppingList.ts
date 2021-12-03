/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */


export class ShoppingList{
  public access: ShoppingListAccess;
  public owner: string;
  public items: Item[] = [];
  constructor(
    public name: string,
    ){this.access = ShoppingListAccess.linkSharingDisabled;}
}

export class Item{
  public name: string;
  public done: boolean;
  constructor(){}
};

export enum ShoppingListAccess{
    view,
    viewAndEdit,
    linkSharingDisabled
}
