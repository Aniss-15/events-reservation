import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private Firstname= new BehaviorSubject<string>("");
private role$ =new BehaviorSubject<string>("");
  constructor() { }
  getRoleFromStore(): Observable<string> {
    return this.role$.asObservable();
  }
  public setRoleFromStore(role:string){
    this.role$.next(role);
  }
  getFullNameFromStore(): Observable<string> {
    return this.Firstname.asObservable();
  }
  public setFullNameFromStore(fullname:string)
  {
    this.Firstname.next(fullname);
  }
}


