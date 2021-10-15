package com.example.demo.controller;

import com.example.demo.model.Calendar;
import com.example.demo.model.CalendarResponse;
import com.example.demo.service.CalendarService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * カレンダーに関するコントローラークラスです。
 */
@RestController
@RequestMapping("/api/calendar")
public class CalendarController {

    private final CalendarService calendarService;

    @Autowired
    public CalendarController(CalendarService calendarService) {
        this.calendarService = calendarService;
    }

    /**
     * 渡されたIDのカレンダーを返します。
     * 
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public CalendarResponse findById(@PathVariable String id) {
        CalendarResponse calendarResponse = new CalendarResponse();
        BeanUtils.copyProperties(calendarService.findById(id), calendarResponse);
        return calendarResponse;
    }

    /**
     * カレンダーを作成します。
     * 
     * @param calendar
     * @return
     */
    @PostMapping("")
    public Calendar create(@RequestBody Calendar calendar) {
        return calendarService.create(calendar);
    }

    /**
     * カレンダーの権限の認証をします。
     * 
     * @param calendar
     * @return
     */
    @PostMapping("/auth")
    public boolean auth(@RequestBody Calendar calendar) {
        return calendarService.auth(calendar);
    }
}
