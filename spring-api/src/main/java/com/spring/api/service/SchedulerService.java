package com.spring.api.service;

import com.spring.api.model.Scheduler;

public interface SchedulerService {

	void saveOrUpdateSchedule(Scheduler scheduler);
	Scheduler findScheduleById();
}
