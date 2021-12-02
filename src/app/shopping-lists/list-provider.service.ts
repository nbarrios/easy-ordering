

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/firebase.service';
import { Item, ShoppingList } from './models/ShoppingList';

@Injectable({
  providedIn: 'root'
})
export class ListProviderService {
  collectionName = 'shoppingLists';
  userCollection: AngularFirestoreCollection<ShoppingList> = null;
  constructor(
    public fireservice: FirebaseService,
    public firestore: AngularFirestore)
    {
      this.userCollection = this.firestore.collection<ShoppingList>(this.collectionName,
       ref => ref.where('owner', '==', this.fireservice.getUserID()));
    }

     public getAllUserShoppingLists(): Observable<ShoppingList[]>
     {
       return this.userCollection.valueChanges({idField: 'docID'});
     }

     public getList(id: string): Observable<ShoppingList>
     {
       console.log("getList id : " + id);
       // return this.firestore.collection<ShoppingList>(this.collectionName).doc(id).valueChanges();
       return this.firestore.collection<ShoppingList>(this.collectionName).doc(id).valueChanges();
     }

     public addList(list: ShoppingList)
     {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      return new Promise<any>((resolve, rejects) =>{
        // map list to look like Javascript object notation
        this.userCollection.add({
          name: list.name,
          id: '',
          items: [],
          access: list.access,
          owner: this.fireservice.getUserID()
        }).then(res => {this.updateDocId(res.id);}, err => console.log('addList error: '+err));
      });
     }

     private updateDocId(docId: string){
       return this.userCollection.doc(docId).update({id: docId});
     }

     // eslint-disable-next-line @typescript-eslint/member-ordering
     public updateList(list: ShoppingList){
      const listDoc = this.userCollection.doc(list.id);
      // Destroy and create a new doc
      listDoc.set({
        name: list.name,
        id: list.id,
        items: list.items,
        access: list.access,
        owner: this.fireservice.getUserID()
      });
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    public deleteList(id: string){
      return this.userCollection.doc(id).delete();
    }
}
