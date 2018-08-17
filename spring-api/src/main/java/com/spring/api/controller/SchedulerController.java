package com.spring.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.api.model.Scheduler;
import com.spring.api.service.SchedulerService;

@CrossOrigin(origins="*", maxAge = 3600)
@RestController
public class SchedulerController {
	
	@Autowired 
	SchedulerService schedulerService;
	
	@PostMapping("/api/scheduler/save")
	void saveOrUpdateSchedule(@RequestBody Scheduler scheduler) {
		scheduler.setScheduleId((long) 1);
		schedulerService.saveOrUpdateSchedule(scheduler);
	}
	
	@GetMapping("/api/scheduler/find")
	Scheduler findScheduleById() {
		return schedulerService.findScheduleById();
	}
	
}
