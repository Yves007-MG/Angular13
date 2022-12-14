import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

 
  isAuth     = false ;
  lastUpdate = new  Promise(
    (resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  }
  )

  appareils:any[] | undefined;
  appareilSubscription!: Subscription;
  constructor(private appareilService : AppareilService){
    setTimeout(
      () =>{
         this.isAuth = true ;
      },4000
    );
  }
  ngOnInit() {
    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(
      (appareils:any[])=>{
        this.appareils = appareils ;
      }
    );
    this.appareilService.emitAppareilSubject();
    // this.appareils = this.appareilService.appareils;
    
  }
  onAllumer(){
    this.appareilService.switchOnAll();
  }
  onEtteindre() {
    this.appareilService.switchOffAll();
  }
  onSave(){
    this.appareilService.saveAppareilsToServer();
  }
  onFetch(){
    this.appareilService.getAppareilsFromServer();
  }

}
