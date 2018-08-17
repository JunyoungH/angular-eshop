package com.spring.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.spring.api.model.Scheduler;
import com.spring.api.repository.SchedulerRepository;

@Transactional
@Service
public class SchedulerImple implements SchedulerService{

	@Autowired
	SchedulerRepository schedulerRepository;
	
	@Override
	public void saveOrUpdateSchedule(Scheduler scheduler) {
		schedulerRepository.save(scheduler);
	}

	@Override
	public Scheduler findScheduleById() {
		return schedulerRepository.findById((long)1).get();
	}
}
