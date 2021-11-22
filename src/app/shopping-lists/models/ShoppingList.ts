

export class ShoppingList{
  public access: ShoppingListAccess;
  constructor(
    public name: string,
    public id: string,
    ){this.access = ShoppingListAccess.linkSharingDisabled;}
}
export enum ShoppingListAccess{
    view,
    viewAndEdit,
    linkSharingDisabled
}
