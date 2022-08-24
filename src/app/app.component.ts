import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, isObservable, observable, Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  secondes!: number;
  counterSubscription! : Subscription;
  constructor(){}

  ngOnInit(): void {

    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value:number) => {

        this.secondes = value;
      }
    ) ;

    throw new Error('Method not impleme nted.');
  }

  ngOnDestroy(): void {
    this.counterSubscription.unsubscribe();
    throw new Error('Method not implemented.');
  }

}
