package com.spring.api.model;

import javax.persistence.*;

@Entity
public class Scheduler {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	private Long scheduleId;
	
	@Column
	private Integer baseDate;
	
	@Column
	private Integer flightInterval;
	
	@Column
	private Integer currentMonth;
	
	@Column
	private Integer nextBaseDate;
	

	public Long getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(Long scheduleId) {
		this.scheduleId = scheduleId;
	}

	public Integer getBaseDate() {
		return baseDate;
	}

	public void setBaseDate(Integer baseDate) {
		this.baseDate = baseDate;
	}

	public Integer getFlightInterval() {
		return flightInterval;
	}

	public void setFlightInterval(Integer flightInterval) {
		this.flightInterval = flightInterval;
	}

	public Integer getCurrentMonth() {
		return currentMonth;
	}

	public void setCurrentMonth(Integer currentMonth) {
		this.currentMonth = currentMonth;
	}

	public Integer getNextBaseDate() {
		return nextBaseDate;
	}

	public void setNextBaseDate(Integer nextBaseDate) {
		this.nextBaseDate = nextBaseDate;
	}



}
