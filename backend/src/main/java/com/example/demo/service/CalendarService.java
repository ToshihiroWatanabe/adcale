package com.example.demo.service;

import java.util.UUID;

import com.example.demo.mapper.CalendarMapper;
import com.example.demo.model.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * カレンダーに関するサービスクラスです。
 */
@Service
public class CalendarService {
    private final CalendarMapper calendarMapper;

    @Autowired
    public CalendarService(CalendarMapper calendarMapper) {
        this.calendarMapper = calendarMapper;
    }

    /**
     * 渡されたIDのカレンダーを返します。
     * 
     * @param id
     * @return
     */
    public Calendar findById(String id) {
        return calendarMapper.findById(id);
    }

    /**
     * カレンダーを作成します。
     * 
     * @param calendar
     * @return
     */
    public Calendar create(Calendar calendar) {
        String id = UUID.randomUUID().toString();
        calendar.setId(id);
        calendar.setAuthKey(UUID.randomUUID().toString());
        if (calendarMapper.create(calendar)) {
            return calendarMapper.findById(id);
        }
        return null;
    }

    /**
     * 認証キーを検証します。
     */
    public boolean auth(Calendar calendar) {
        Calendar foundCalendar = calendarMapper.findById(calendar.getId());
        if (calendar.getAuthKey().equals(foundCalendar.getAuthKey())) {
            return true;
        } else {
            return false;
        }
    }
}
