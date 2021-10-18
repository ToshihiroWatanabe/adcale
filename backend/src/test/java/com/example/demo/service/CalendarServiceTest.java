package com.example.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.demo.mapper.CalendarMapper;
import com.example.demo.model.Calendar;
import com.example.demo.service.CalendarService;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(classes = CalendarService.class)
@DisplayName("CalendarServiceのテスト")
public class CalendarServiceTest {

    @Autowired
    private CalendarService calendarService;

    @MockBean
    private CalendarMapper calendarMapper;

    @Nested
    @DisplayName("findByIdメソッド")
    public class FindById {

        @Test
        @DisplayName("成功")
        void succeed() {
            Calendar calendar = new Calendar();
            calendar.setId("00000000-0000-0000-0000-000000000000");
            Mockito.when(calendarMapper.findById("00000000-0000-0000-0000-000000000000")).thenReturn(calendar);
            assertEquals(calendar, calendarService.findById("00000000-0000-0000-0000-000000000000"));
        }
    }

    @Nested
    @DisplayName("createメソッド")
    public class Create {
        @Test
        @DisplayName("mapperからfalseが返されるとnullと返す事")
        void fail() {
            Calendar calendar = new Calendar();
            Mockito.when(calendarMapper.create(calendar)).thenReturn(false);
            assertNull(calendarService.create(calendar));
        }
    }

    @Nested
    @DisplayName("authメソッド")
    public class Auth {
        @Test
        @DisplayName("成功")
        void succeed() {
            Calendar calendar = new Calendar();
            calendar.setId("00000000-0000-0000-0000-000000000000");
            calendar.setAuthKey("00000000-0000-0000-0000-000000000000");
            Mockito.when(calendarMapper.findById(calendar.getId())).thenReturn(calendar);
            assertTrue(calendarService.auth(calendar));
        }
    }

}
