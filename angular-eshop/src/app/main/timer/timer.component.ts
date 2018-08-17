import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { interval } from 'rxjs';
import { SchedulerService } from '../../core/service/scheduler.service';
import { Scheduler } from '../../core/model/scheduler.model';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, AfterViewInit {

  constructor(private changeDetector : ChangeDetectorRef, private schedulerService:SchedulerService) { }
  month = new Array(12);
  flightDate = new Array(12);
  lastDayOfMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
  currentMonthFlight:number[] = [];
  scheduler:Scheduler = new Scheduler;

  day:number;
  hour:number;
  minute:number;
  second:number;
  newDate:Date;

  ngOnInit() {
    this.schedulerService.getScheduler().subscribe(
      (result:Scheduler)=>{
       
        this.scheduler.flightInterval = result.flightInterval;
        this.newDate = new Date();
        this.setMonth(this.newDate);
        this.setBaseDate(result);
       
      },
      error=>console.log(error)
    );
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit() {

    this.changeDetector.detectChanges();
    interval(1000).subscribe(()=>this.setTimer());

  }

  setBaseDate(storedSchedule:Scheduler){

    if(storedSchedule.currentMonth < this.newDate.getMonth()+1){
      this.scheduler.baseDate = storedSchedule.nextBaseDate;
      this.setflightDate();
      this.updateStoredDate();
    }else{
      this.scheduler.baseDate = storedSchedule.baseDate;
      this.setflightDate();
    }
  }

  setMonth(newDate:Date){

    let currentMonth = newDate.getMonth() +1;

    Array.from(this.month, (val, key)=>{
      this.month[key] = currentMonth + key;
      if(this.month[key]>12){
        this.month[key] = this.month[key] - 12;
        (this.month[key] === 2)? this.setLastDayOfMonth(newDate.getFullYear()+1) 
                               : this.setLastDayOfMonth(newDate.getFullYear());
      }
     });
  }

  setLastDayOfMonth(year){
     if(year%4 === 0 && year%100 !==0 || year%400 ===0){
      this.lastDayOfMonth[1] = 29;
    }else{
      this.lastDayOfMonth[1] = 28;
    }
  }

  setflightDate(){
    for(let i=0; i < this.month.length-1; i++){
      this.flightDate[0] = parseInt(this.scheduler.baseDate.toString());
      this.scheduler.flightInterval = parseInt(this.scheduler.flightInterval.toString());
      let nextMonth = this.lastDayOfMonth[this.month[i]-1]
      this.flightDate[i+1] = (((Math.floor((nextMonth-this.flightDate[i])/this.scheduler.flightInterval)*this.scheduler.flightInterval)+this.flightDate[i])+this.scheduler.flightInterval) - nextMonth;
    
    }
  }

  updateFlightDate(){
    this.setflightDate();
    this.updateStoredDate();
  }

  updateStoredDate(){
    this.scheduler.currentMonth = this.newDate.getMonth()+1;
    this.scheduler.nextBaseDate = this.flightDate[1];
    this.schedulerService.saveOrUpdateScheduler(this.scheduler).subscribe(error=>console.log(error));
  }

  setCurrentMonthFlight(timer){
    this.currentMonthFlight = timer;
    this.setTimer();
  }

  setTimer(){
    let now = new Date();
    let nextDateArray = [];
    let nextDate;
    let flightMonth;
    
    this.currentMonthFlight.forEach((val, key)=>{
      if(this.currentMonthFlight[key] >= now.getDate()){
        nextDateArray.push(this.currentMonthFlight[key]);
      }
    });

    if(now.getHours() ===0 && now.getDate()===1)this.ngOnInit();
    if(now.getHours() >=22 && nextDateArray[0] === now.getDate())nextDateArray.splice(0,1);


    if(nextDateArray.length <= 0){
      nextDate = this.flightDate[1];
      flightMonth = now.getMonth() + 1;
    }else{
      nextDate = nextDateArray[0];
      flightMonth = now.getMonth();
    }

    let dday = new Date(now.getUTCFullYear() , flightMonth, nextDate, 22, 0, 0); 
    let days = (dday.getTime() - now.getTime()) / 1000 / 60 / 60 / 24; 
    this.day = Math.floor(days); 
    let hours = (dday.getTime() - now.getTime()) / 1000 / 60 / 60 - (24 * this.day); 
    this.hour = Math.floor(hours); 
    let minutes = (dday.getTime() - now.getTime()) / 1000 /60 - (24 * 60 * this.day) - (60 * this.hour); 
    this.minute = Math.floor(minutes); 
    let seconds = (dday.getTime() - now.getTime()) / 1000 - (24 * 60 * 60 * this.day) - (60 * 60 * this.hour) - (60 * this.minute); 
    this.second = Math.round(seconds); 
  }

}
