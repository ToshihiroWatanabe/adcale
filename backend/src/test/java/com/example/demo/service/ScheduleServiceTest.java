package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;

import java.time.LocalDate;
import java.util.List;

import com.example.demo.mapper.ScheduleMapper;
import com.example.demo.model.ScheduleCreateRequest;
import com.example.demo.service.CalendarService;
import com.example.demo.service.ScheduleService;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(classes = ScheduleService.class)
@DisplayName("ScheduleServiceのテスト")
public class ScheduleServiceTest {

    @Autowired
    private ScheduleService scheduleService;

    @MockBean
    private CalendarService calendarService;

    @MockBean
    private ScheduleMapper scheduleMapper;

    @Nested
    @DisplayName("findByCalendarIdのテスト")
    public class FindByCalendarId {
        @Test
        @DisplayName("成功")
        void succeed() {
            Mockito.when(scheduleMapper.findByCalendarId("00000000-0000-0000-0000-000000000000")).thenReturn(List.of());
            assertEquals(List.of(), scheduleService.findByCalendarId("00000000-0000-0000-0000-000000000000"));
        }
    }

    @Nested
    @DisplayName("createメソッド")
    public class Create {
        @Test
        @DisplayName("失敗")
        void fail() {
            ScheduleCreateRequest request = new ScheduleCreateRequest();
            Mockito.when(calendarService.auth(any())).thenReturn(false);
            assertFalse(scheduleService.create(request));
        }

        @Test
        @DisplayName("成功")
        void succeed() {
            ScheduleCreateRequest request = new ScheduleCreateRequest();
            Mockito.when(calendarService.auth(any())).thenReturn(true);
            Mockito.when(scheduleMapper.create(any())).thenReturn(true);
            assertTrue(scheduleService.create(request));
        }

    }

    @Nested
    @DisplayName("updateメソッド")
    public class Update {

        @Test
        @DisplayName("失敗")
        void fail() {
            ScheduleCreateRequest request = new ScheduleCreateRequest();
            Mockito.when(calendarService.auth(any())).thenReturn(false);
            assertFalse(scheduleService.update(request));
        }

        @Test
        @DisplayName("成功")
        void succeed() {
            ScheduleCreateRequest request = new ScheduleCreateRequest();
            Mockito.when(calendarService.auth(any())).thenReturn(true);
            Mockito.when(scheduleMapper.update(any())).thenReturn(true);
            assertTrue(scheduleService.update(request));
        }
    }
}
