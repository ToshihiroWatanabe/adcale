package com.example.demo.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.example.demo.model.Calendar;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.test.context.TestPropertySource;

@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource(locations = "classpath:test.properties")
@DisplayName("calendarsテーブルのマッパークラスのテスト")
public class CalendarMapperTest {

    @Autowired
    private CalendarMapper calendarMapper;

    @Nested
    @DisplayName("findByIdメソッドでcalendarsテーブルから取得できる事")
    class FindById {

        @Test
        void findById() {
            Calendar calendar = calendarMapper.findById("18a3a021-076a-41cb-8be2-b0727c63863d");
            assertEquals("テストアドベントカレンダー", calendar.getTitle());
        }
    }
}
