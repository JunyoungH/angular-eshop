import { Component, OnInit, Input, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scheduler-item',
  templateUrl: './scheduler-item.component.html',
  styleUrls: ['./scheduler-item.component.scss']
})
export class SchedulerItemComponent implements OnInit, AfterViewInit {

  @Input() month:number;
  @Input() lastDateOfMonth:number;
  @Input() baseDate:number;
  @Input() flightInterval:number;
  @Input() uId:number;
  @Output() timer:EventEmitter<any> = new EventEmitter();
  
  flightDate:number[] = [];
  date:number[] = [];

  constructor(private element:ElementRef) { }

  ngOnInit() {
    this.setMonthlyDate();
  }

  ngAfterViewInit(){
    this.setFlightDate();
    this.setTimer();
    this.setPassedDate();
  }


  updateFlightDate(baseDate, flightTerm){

    this.baseDate = parseInt(baseDate);
    this.flightInterval = parseInt(flightTerm);
    this.setFlightDate();
    this.setTimer();
  }  

  setTimer(){
    if(this.uId === 0)this.timer.emit(this.flightDate);

  }

  setPassedDate(){
    let now = new Date();
    if(this.uId===0){
      this.date.forEach((val, key)=>{
        if(val<now.getDate())this.element.nativeElement.querySelector(`#date-${val}`).classList.add('passed');
        if(val===now.getDate())this.element.nativeElement.querySelector(`#date-${val}`).classList.add('today');
      });
    }
  }

  setMonthlyDate(){
    this.date = Array.from({length:this.lastDateOfMonth},(val, key)=>key+1);

  }

  setFlightDate(){
    
    if(this.baseDate !==0 && this.baseDate){

      Array.from(this.element.nativeElement.querySelectorAll('.schedule-date'), (val:any, key)=>val.classList.remove('flight'));
      let idx = 0;
      let tempDate:number = null;
      this.flightDate = [];
      this.flightDate.push(this.baseDate);

      while(true){
        tempDate = this.flightDate[idx] + this.flightInterval;
        this.element.nativeElement.querySelector(`#date-${this.flightDate[idx]}`).classList.add('flight');
        if(tempDate >this.lastDateOfMonth)break;
        this.flightDate.push(tempDate);
        idx++;
      }

      if(this.uId === 0){
        let date = new Date();
        this.flightDate.forEach((val, key)=>{
          if(date.getDate()>this.flightDate[key]){
            this.element.nativeElement.querySelector(`#date-${this.flightDate[key]}`).classList.add('pass');
          }
        });
      }

   }
  }

}
