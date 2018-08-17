import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scheduler } from '../model/scheduler.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private http:HttpClient) { }

  baseUrl = 'http://localhost:8080/api/scheduler';

  saveOrUpdateScheduler(scheduler:Scheduler){
    console.log(scheduler);
    return this.http.post(`${this.baseUrl}/save`, scheduler);
  }

  getScheduler(){
    return this.http.get(`${this.baseUrl}/find`);
  }
}
