package com.spring.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.api.model.Scheduler;

public interface SchedulerRepository extends JpaRepository<Scheduler, Long> {
	
}
