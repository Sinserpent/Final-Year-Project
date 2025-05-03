import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebartoggleService {
  private isActive = new BehaviorSubject<boolean>(false)
  isActive$ = this.isActive.asObservable()

  

  toggle(){
    this.isActive.next(!this.isActive.value)
  }
  
  setState(state:boolean){
    this.isActive.next(state)
  }
}
