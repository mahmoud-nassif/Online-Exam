import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Observable,timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
ticks:number=0;
hours:number=0;
minutes:number=0;
seconds:number=0;
subscription:Subscription;

@Output() timeUp:EventEmitter<boolean>=new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
    this.startTimer()
  }

  startTimer()
  {
    this.subscription=timer(0,1000).subscribe(t=>{

      this.ticks=t;

      this.seconds=this.getSeconds(this.ticks);
      this.minutes=this.getMinutes(this.ticks);
      if(this.seconds==-1)
      {
        this.subscription.unsubscribe();
        this.timeUp.emit(true)
      }
      this.hours=this.getHours(this.ticks);
       
     })
  }
  getSeconds(ticks)
  {
    return this.pad(ticks%60)
  }
  
  getMinutes(ticks)
  {
    return this.pad(Math.floor(ticks/60)%60)
  }

  getHours(ticks)
  {
   return this.pad(Math.floor((ticks/60)/60))
  }


  pad(digit)
  {
    return digit<=9 ? '0'+digit : digit
  }

}
