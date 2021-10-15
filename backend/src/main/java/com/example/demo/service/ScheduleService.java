package com.example.demo.service;

import java.util.List;
import java.util.UUID;

import com.example.demo.mapper.ScheduleMapper;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Calendar;
import com.example.demo.model.Schedule;
import com.example.demo.model.ScheduleCreateRequest;

/**
 * 予定に関するサービスクラスです。
 */
@Service
public class ScheduleService {

    private final ScheduleMapper scheduleMapper;
    private final CalendarService calendarService;

    @Autowired
    public ScheduleService(ScheduleMapper scheduleMapper, CalendarService calendarService) {
        this.scheduleMapper = scheduleMapper;
        this.calendarService = calendarService;
    }

    /**
     * 渡されたカレンダーIDの予定リストを返します。
     * 
     * @param calendarId
     * @return
     */
    public List<Schedule> findByCalendarId(String calendarId) {
        return scheduleMapper.findByCalendarId(calendarId);
    }

    /**
     * 予定を作成します。
     * 
     * @param request
     * @return
     */
    public boolean create(ScheduleCreateRequest request) {
        // 認証
        Calendar calendar = new Calendar();
        calendar.setId(request.getCalendarId());
        calendar.setAuthKey(request.getAuthKey());
        if (calendarService.auth(calendar)) {
            // 認証成功時
            Schedule schedule = new Schedule();
            BeanUtils.copyProperties(request, schedule);
            schedule.setId(UUID.randomUUID().toString());
            return scheduleMapper.create(schedule);
        } else {
            return false;
        }
    }

    /**
     * 予定を更新します。
     * 
     * @param request
     * @return
     */
    public boolean update(ScheduleCreateRequest request) {
        // 認証
        Calendar calendar = new Calendar();
        calendar.setId(request.getCalendarId());
        calendar.setAuthKey(request.getAuthKey());
        if (calendarService.auth(calendar)) {
            // 認証成功時
            Schedule schedule = new Schedule();
            BeanUtils.copyProperties(request, schedule);
            return scheduleMapper.update(schedule);
        } else {
            return false;
        }
    }
}
