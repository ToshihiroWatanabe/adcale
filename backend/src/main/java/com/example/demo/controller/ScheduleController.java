package com.example.demo.controller;

import java.util.List;

import com.example.demo.service.ScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Schedule;
import com.example.demo.model.ScheduleCreateRequest;

/**
 * 予定に関するコントローラークラスです。
 */
@RestController
@RequestMapping("/api/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    /**
     * 渡されたカレンダーIDの予定リストを返します。
     * 
     * @param calendarId
     * @return
     */
    @GetMapping("/{calendarId}")
    public List<Schedule> findByCalendarId(@PathVariable String calendarId) {
        return scheduleService.findByCalendarId(calendarId);
    }

    /**
     * 予定を作成します。
     * 
     * @param calendarId
     * @param request
     * @return
     */
    @PostMapping("/{calendarId}")
    public boolean create(@PathVariable String calendarId, @RequestBody ScheduleCreateRequest request) {
        request.setCalendarId(calendarId);
        return scheduleService.create(request);
    }

    /**
     * 予定を更新します。
     * 
     * @param calendarId
     * @param request
     * @return
     */
    @PutMapping("/{calendarId}")
    public boolean update(@PathVariable String calendarId, @RequestBody ScheduleCreateRequest request) {
        request.setCalendarId(calendarId);
        return scheduleService.update(request);
    }
}
