

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase.service';
import { Item, ShoppingList } from './models/ShoppingList';
import { instanceToPlain } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class ListProviderService {
  collectionName = 'shoppingLists';
  userCollection: AngularFirestoreCollection<ShoppingList> = null;
  constructor(
    public fireservice: FirebaseService,
    public firestore: AngularFirestore){
      this.userCollection = this.firestore.collection<ShoppingList>(this.collectionName,
       ref => ref.where('owner', '==', this.fireservice.getUserID()));
    }

     public getAllUserShoppingLists(): Observable<(ShoppingList & {docID: string;})[]>{
       return this.userCollection.valueChanges({idField: 'docID'});
     }

     public getList(id: string): Observable<(ShoppingList & {docID: string;})>{
       console.log('getList id : ' + id);
       // return this.firestore.collection<ShoppingList>(this.collectionName).doc(id).valueChanges();
       this.userCollection = this.firestore.collection<ShoppingList>(this.collectionName,
        ref => ref.where('owner', '==', this.fireservice.getUserID()));
       return this.firestore.collection<ShoppingList>(this.collectionName).doc(id).valueChanges({idField: 'docID'});
     }

     public addList(list: ShoppingList)
     {
      this.userCollection.add({
        name: list.name,
        items: [],
        access: list.access,
        owner: this.fireservice.getUserID()
      });
     }

     // eslint-disable-next-line @typescript-eslint/member-ordering
     public updateList(list: (ShoppingList & {docID: string;})){
      const listDoc = this.userCollection.doc(list.docID);
      // Destroy and create a new doc
      listDoc.set(instanceToPlain(list) as ShoppingList);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public deleteList(id: string){
      return this.userCollection.doc(id).delete();
    }
}
